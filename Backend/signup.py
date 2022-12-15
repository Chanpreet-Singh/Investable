import traceback
from datetime import datetime

import constants
from cognitoUtilities import CognitoUtilities
from mongoUtilities import MongoUtilities


class Signup:
    def __init__(self):
        self.cognito_obj = CognitoUtilities(access_key_id=constants.aws_access_key, secret_access_key=constants.aws_secret_access_key, client_id=constants.cognito_client_id)

    def main(self, body_dict):
        output = {
                    "statusCode": 500,
                    "body": {
                                "message": "Something went wrong!"
                            }
                }
        try:
            resp_dict = self.cognito_obj.signup_user(email=body_dict["email"], password=body_dict["password"], user_pool_id=constants.cognito_user_pool_id)
            if resp_dict["status"] == 200 and resp_dict["user_id"] is not None:
                data_dict = {
                                "first_name": body_dict["first_name"],
                                "last_name": body_dict["last_name"],
                                "email": body_dict["email"],
                                "mobile_num": body_dict["mobile_num"],
                                "city": body_dict["city"],
                                "company_name": body_dict["company_name"],
                                "about": body_dict["about"],
                                "country": body_dict["country"],
                                "profile_type": body_dict["profile_type"],
                                "technology": body_dict["technology"],
                                "interest_market": body_dict["interest_market"],
                                "ethnicity": body_dict["ethnicity"],
                                "past_investments": body_dict["past_investments"],
                                "gender": body_dict["gender"],
                                "profile_pic": body_dict["profile_pic"],
                                "additional_doc" : body_dict["additional_doc"],
                                "profile_create_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                              }
                mongo_obj = MongoUtilities(constants.mongo_uri, constants.mongo_dbname)
                status = mongo_obj.write_one(constants.mongo_user_collection, data_dict)
                if status:
                    output = {
                                "statusCode": 200,
                                "body": {
                                            "message": "User Registered successfully!"
                                        }
                                }
                else:
                    # To preserve data consistency among cognito and mongo.
                    self.cognito_obj.admin_delete_user(email=body_dict["email"], user_pool_id=constants.cognito_user_pool_id)
            else:
                output = {
                                "statusCode": resp_dict["status"],
                                "body": {
                                            "message": resp_dict["message"]
                                        }
                        }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output
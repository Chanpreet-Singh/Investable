import traceback

import constants
from cognitoUtilities import CognitoUtilities
from mongoUtilities import MongoUtilities


class Login:
    def __init__(self):
        self.cognito_obj = CognitoUtilities(access_key_id=constants.aws_access_key, secret_access_key=constants.aws_secret_access_key, client_id=constants.cognito_client_id)

    def main(self, body_dict):
        output = {
                    "statusCode": 500,
                    "body": {
                                "message": "Something went wrong!",
                                "special_case": False,
                                "user_data": {}
                            }
                }
        try:
            cognito_resp = self.cognito_obj.login_user(email=body_dict["email"], password=body_dict["password"])
            if cognito_resp["success"] and cognito_resp["user_data"] and cognito_resp["status"] == 200:
                mongo_obj = MongoUtilities(constants.mongo_uri, constants.mongo_dbname)
                user_data = mongo_obj.read_one(constants.mongo_user_collection, "email", body_dict["email"])
                if user_data:
                    output = {
                                "statusCode": cognito_resp["status"],
                                "body": {
                                            "message": cognito_resp["message"],
                                            "special_case": False,
                                            "user_data": user_data
                                        }
                            }
                else:
                    output = {
                                "statusCode": 500,
                                "body": {
                                            "message": "Data present in Cognito but not in mongo. Inconsistent data!",
                                            "special_case": True,
                                            "user_data": {}
                                        }
                                }
            else:
                output = {
                            "statusCode": cognito_resp["status"],
                            "body": {
                                        "message": cognito_resp["message"],
                                        "special_case": False,
                                        "user_data": {}
                                    }
                        }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output
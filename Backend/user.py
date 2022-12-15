import traceback

import constants
from mongoUtilities import MongoUtilities


class User:
    def getuser(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!",
                "special_case": False,
                "user_data": {}
            }
        }
        try:
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            user_data = mongo_obj.read_all(constants.mongo_user_collection)
            if user_data:
                user = None
                for user_info in user_data:
                    if user_info["email"] == body_dict["email"]:
                        user = user_info
                        break
                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "Post data retrived successfully.",
                        "special_case": False,
                        "user_data": user
                    }
                }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def updateuser(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!",
                "special_case": False,
                "user_data": {}
            }
        }
        try:
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            data = {}
            for key in body_dict.keys():
                if key != "_id" and key != "email":
                    data[key] = body_dict[key]
            update_status = mongo_obj.update_one(
                constants.mongo_user_collection, "email", body_dict["email"], data)

            if update_status:
                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "User details updated successfully.",
                        "special_case": False,
                    }
                }
            else:
                output = {
                    "statusCode": 500,
                    "body": {
                        "message": "User details updation failed.",
                        "special_case": False,
                    }
                }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

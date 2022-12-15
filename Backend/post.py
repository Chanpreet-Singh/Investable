import traceback
from datetime import datetime
from bson.objectid import ObjectId

import constants
from mongoUtilities import MongoUtilities


class Post:
    def addpost(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!"
            }
        }
        try:
            data_dict = {
                "email": body_dict["email"],
                "company": body_dict["company"],
                "industry": body_dict["industry"],
                "investors": body_dict["investors"],
                "abstract": body_dict["abstract"],
                "founders": body_dict["founders"],
                "founded": body_dict["founded"],
                "headquarter": body_dict["headquarter"],
                "locations": body_dict["locations"],
                "valuation": body_dict["valuation"],
                "total_employees": body_dict["total_employees"],
                "funding_total": body_dict["funding_total"],
                "funding_required": body_dict["funding_required"],
                "team_info": body_dict["team_info"],
                "company_info": body_dict["company_info"],
                "founder_info": body_dict["founder_info"],
                "logo": body_dict["logo"],
                "technology": body_dict["technology"],
                "post_create_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            status = mongo_obj.write_one(
                constants.mongo_post_collection, data_dict)
            if status:
                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "Post details inserted successfully!"
                    }
                }

        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def readpost(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!"
            }
        }
        try:
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            post_detail = mongo_obj.read_one(
                constants.mongo_post_collection, "_id", ObjectId(body_dict["_id"]))
            if post_detail:
                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "Post details retrived successfully.",
                        "special_case": False,
                        "post_data": post_detail
                    }
                }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def updatepost(self, body_dict):
        pass

    def deletepost(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!"
            }
        }
        try:
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            status = mongo_obj.delete_one(
                constants.mongo_post_collection, "_id", ObjectId(body_dict["_id"]))
            if status:
                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "Post deleted successfully!"
                    }
                }
            else:
                output = {
                    "statusCode": 500,
                    "body": {
                        "message": "Post deletion failed!"
                    }
                }

        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def feed(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!",
                "special_case": False,
                "post_data": {}
            }
        }
        try:
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            post_data = mongo_obj.read_all(constants.mongo_post_collection)
            if post_data:
                data = []
                if body_dict["industry"] == "" and body_dict["technology"] == "":
                    data = post_data
                elif body_dict["industry"] != "" and body_dict["technology"] != "":
                    for post in post_data:
                        if post["industry"] == body_dict["industry"] and post["technology"] == body_dict["technology"]:
                            data.append(post)
                elif body_dict["industry"] != "":
                    for post in post_data:
                        if post["industry"] == body_dict["industry"]:
                            data.append(post)
                elif body_dict["technology"] != "":
                    for post in post_data:
                        if post["technology"] == body_dict["technology"]:
                            data.append(post)

                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "Post data retrived successfully.",
                        "special_case": False,
                        "post_data": data
                    }
                }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def mypost(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!",
                "special_case": False,
                "post_data": {}
            }
        }
        try:
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            post_data = mongo_obj.read_all(constants.mongo_post_collection)
            if post_data:
                mypost = []
                for post in post_data:
                    if post["email"] == body_dict["email"]:
                        mypost.append(post)
                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "Post data retrived successfully.",
                        "special_case": False,
                        "post_data": mypost
                    }
                }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def updatepost(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!",
                "special_case": False
            }
        }
        try:
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            data = {}
            for key in body_dict.keys():
                if key != "_id":
                    data[key] = body_dict[key]
            update_status = mongo_obj.update_one(
                constants.mongo_post_collection, "_id", ObjectId(body_dict["_id"]), data)
            if update_status:
                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "Post details updated successfully.",
                        "special_case": False,
                    }
                }
            else:
                output = {
                    "statusCode": 500,
                    "body": {
                        "message": "Post details updation failed.",
                        "special_case": False,
                    }
                }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def filterfeed(self, body_dict):
        output = {
            "statusCode": 500,
            "body": {
                "message": "Something went wrong!",
                "special_case": False,
                "post_data": {}
            }
        }
        try:
            mongo_obj = MongoUtilities(
                constants.mongo_uri, constants.mongo_dbname)
            post_data = mongo_obj.read_all(constants.mongo_post_collection)
            user_data = mongo_obj.read_all(constants.mongo_user_collection)

            filter_data = {}
            for user in user_data:
                temp = {}
                temp["gender"] = user["gender"]
                temp["ethnicity"] = user["ethnicity"]
                temp["additional_doc"] = user["additional_doc"]
                filter_data[user["email"]] = temp

            if post_data:

                for post in post_data:
                    post["gender"] = filter_data[post["email"]]["gender"]
                    post["ethnicity"] = filter_data[post["email"]]["ethnicity"]
                    post["additional_doc"] = filter_data[post["email"]
                                                         ]["additional_doc"]

                data = []
                if body_dict["industry"] == "" and body_dict["technology"] == "":
                    data = post_data
                else:
                    for post in post_data:
                        if post["industry"] == body_dict["industry"] or post["technology"] == body_dict["technology"]:
                            data.append(post)

                output = {
                    "statusCode": 200,
                    "body": {
                        "message": "Post data retrived successfully.",
                        "special_case": False,
                        "post_data": data
                    }
                }
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

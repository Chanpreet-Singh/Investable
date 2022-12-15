import json

from signup import Signup
from login import Login
from post import Post
from user import User

# This function is the entry-point to the whole service. This will only parse the body-params,query-params, path-params, etc and route to the appropriate call on the basis of path.


def lambda_handler(event, context):
    lambda_output = {
        "statusCode": 404,
        "body": json.dumps("404 - API Path Not Found")
    }
    print(json.dumps(event, indent=2))

    path = event.get("rawPath", None)
    if path:
        path = path.split("/")

    body = event.get("body", None)
    if body:
        body = json.loads(body)

    query_dict = event.get("rawQueryString", None)

    print("path >>>> {0}\nquery >>>> {1}\nbody >>>> {2}\n".format(
        path, json.dumps(query_dict, indent=2), json.dumps(body, indent=2)))

    if path[2] == "signup":
        print("Got signup API hit!")
        cls_obj = Signup()
        lambda_output = cls_obj.main(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "login":
        print("Got login API hit!")
        cls_obj = Login()
        lambda_output = cls_obj.main(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "addpost":
        print("Got addpost API hit!")
        cls_obj = Post()
        lambda_output = cls_obj.addpost(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "updatepost":
        print("Got updatepost API hit!")
        cls_obj = Post()
        lambda_output = cls_obj.updatepost(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "readpost":
        print("Got readpost API hit!")
        cls_obj = Post()
        lambda_output = cls_obj.readpost(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "deletepost":
        print("Got deletepost API hit!")
        cls_obj = Post()
        lambda_output = cls_obj.deletepost(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "feed":
        print("Got feed API hit!")
        cls_obj = Post()
        lambda_output = cls_obj.feed(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "mypost":
        print("Got mypost API hit!")
        cls_obj = Post()
        lambda_output = cls_obj.mypost(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "getuser":
        print("Got getuser API hit!")
        cls_obj = User()
        lambda_output = cls_obj.getuser(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "updateuser":
        print("Got updateuser API hit!")
        cls_obj = User()
        lambda_output = cls_obj.updateuser(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "updatepost":
        print("Got updatepost API hit!")
        cls_obj = Post()
        lambda_output = cls_obj.updatepost(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    if path[2] == "filterfeed":
        print("Got filterfeed API hit!")
        cls_obj = Post()
        lambda_output = cls_obj.filterfeed(body_dict=body)
        lambda_output["body"] = json.dumps(lambda_output["body"])
        lambda_output['headers'] = {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }
        print(json.dumps(lambda_output, indent=2))

    return lambda_output

import traceback
from pymongo import MongoClient


class MongoUtilities:
    def __init__(self, uri, db_name):
        self.uri = uri
        self.db_name = db_name
        self.connect()

    def connect(self):
        try:
            self.conn_obj = MongoClient(self.uri)
            self.db = self.conn_obj[self.db_name]
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))

    def write_one(self, collection_name, data):
        """Returns status of insert operation
           Return Type: Boolean
        """
        status = False
        try:
            insert_op = self.db[collection_name].insert_one(data)
            if insert_op.acknowledged:
                print("Inserted record with Object ID >> {0}".format(
                    insert_op.inserted_id))
                status = True
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return status

    def write_many(self, collection_name, list_of_data):
        """
            list_of_data needs to be a list/tuple
            Returns status of insert operation
            Return Type: Boolean
        """
        status = False
        try:
            insert_op = self.db[collection_name].insert_many(list_of_data)
            if insert_op.acknowledged:
                status = True
                x = [str(each) for each in insert_op.inserted_ids]
                print(
                    "Inserted {0} records with Object ID >> \n{1}".format(len(x), x))
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return status

    def read_all(self, collection_name):
        """Returns list of all documents
           Return Type: list
        """
        output = []
        try:
            read_op = self.db[collection_name].find()
            for each_doc in read_op:
                each_doc["_id"] = str(each_doc["_id"])
                output.append(each_doc)
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def read_all_with_filter(self, collection_name, field, value):
        """Returns list of all matched documents
           Return Type: list
        """
        output = []
        try:
            read_op = self.db[collection_name].find({field: value})
            for each_doc in read_op:
                del(each_doc["_id"])
                output.append(each_doc)
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def read_one(self, collection_name, field, value):
        """Returns list of the first matched documents
           Return Type: dict
        """
        output = {}
        try:
            read_op = self.db[collection_name].find_one({field: value})
            if read_op:
                del(read_op["_id"])
                output = read_op
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return output

    def delete_many(self, collection_name, field, value):
        status = False
        try:
            delete_op = self.db[collection_name].delete_many({field: value})
            if delete_op.acknowledged:
                print("Deleted {0} data!".format(delete_op.deleted_count))
                if delete_op.deleted_count > 0:
                    status = True
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return status

    def delete_one(self, collection_name, field, value):
        status = False
        try:
            delete_op = self.db[collection_name].delete_one({field: value})
            if delete_op.acknowledged:
                print("Deleted {0} data!".format(delete_op.deleted_count))
                if delete_op.deleted_count > 0:
                    status = True
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return status

    def update_many(self, collection_name, condition_field, condition_value, data_dict, upsert_flag=False, multi_flag=True):
        status = False
        try:
            update_op = self.db[collection_name].update_many(
                {condition_field: condition_value}, {"$set": data_dict}, upsert=upsert_flag)
            if update_op.acknowledged:
                print("Matched Records: {0}\nUpdated Records: {1}".format(
                    update_op.matched_count, update_op.modified_count))
                status = True
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return status

    def update_one(self, collection_name, condition_field, condition_value, data_dict, upsert_flag=False):
        status = False
        try:
            update_op = self.db[collection_name].update_one(
                {condition_field: condition_value}, {"$set": data_dict}, upsert=upsert_flag)
            if update_op.acknowledged:
                print("Matched Records: {0}\nUpdated Records: {1}".format(
                    update_op.matched_count, update_op.modified_count))
                status = True
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))
        return status

    def close_connections(self):
        try:
            self.conn_obj.close()
        except Exception as e:
            print("{0}\n{1}".format(e, traceback.format_exc()))

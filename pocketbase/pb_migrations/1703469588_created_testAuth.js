/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "opipr3lbnyjzxrf",
    "created": "2023-12-25 01:59:48.202Z",
    "updated": "2023-12-25 01:59:48.202Z",
    "name": "testAuth",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "getmpegu",
        "name": "test",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("opipr3lbnyjzxrf");

  return dao.deleteCollection(collection);
})

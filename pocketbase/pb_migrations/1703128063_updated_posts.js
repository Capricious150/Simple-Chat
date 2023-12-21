/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kc4wtbu3ffmtjmm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ytbk2nyg",
    "name": "poster",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kc4wtbu3ffmtjmm")

  // remove
  collection.schema.removeField("ytbk2nyg")

  return dao.saveCollection(collection)
})

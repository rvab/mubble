/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Wed Jul 19 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/

import { MasterDb } from './master-db'

export class Master {

  public static field(optional ?: boolean) {

    return function(target: any, propertyKey: string) {

      const type = Reflect.getMetadata('design:type', target, propertyKey),
            name = MasterDb.getModelName(target.constructor)

      MasterDb.registerSchema(name, 
                              propertyKey, 
                              false, 
                              Master.getType(type), 
                              !!optional)
    }
  }

  public static key(modelName ?: string) {
    
    return function(target: any, propertyKey: string) {

      if (modelName) MasterDb.registerModelClass(modelName, target.constructor)

      const type = Reflect.getMetadata('design:type', target, propertyKey),
            name = MasterDb.getModelName(target.constructor)

      MasterDb.registerSchema(name, 
                              propertyKey, 
                              true, 
                              Master.getType(type), 
                              false)
    }
  }

  private static getType(fieldType) {
    switch (fieldType) {

      case String   : return 'string'
      case Number   : return 'number'
      case Boolean  : return 'boolean'
      case Array    : return 'array'
      case Object   : return 'object'

      default:
        const msg = 'getType: unknown field type - ' + fieldType
        // console.log(msg)
        throw(new Error(msg))
    }
    
  }

}
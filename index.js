'use strict';

exports.handler.authorizer = async (event) => {
    // Verificar si se proporciona un encabezado de autorización
    const authorizationHeader = event.headers.Authorization;
    
    // Comprobar si el encabezado de autorización existe y tiene un valor esperado
    if (authorizationHeader && authorizationHeader === 'Bearer token123') {
      // La solicitud esta autorizada
      return {
        principalId: 'user123', // Puede ser un identificador unico de usuario
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow',
              Resource: event.methodArn,
            },
          ],
        },
      };
    }
    
    // La solicitud es denegada
    return {
      principalId: 'user123', // Puede ser un identificador unico de usuario
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: event.methodArn
          },
        ],
      },
    };
  };
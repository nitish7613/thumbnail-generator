**************************************************used npm module*******************/
 "body-parser": "^1.19.0",
    "chai": "^4.2.0",
    "express": "^4.17.1",
    "fast-json-patch": "^3.0.0-1",
    "jsonwebtoken": "^8.5.1",
    "mocha": "^8.1.3",
    "node-image-resizer": "^1.0.0",
    "request": "^2.88.2"
    ***************************************************End Points****************************888**********/
    /api/login   ->   for jwt authentication ,it generates a token by using mock user details
                      as username:nitish , password:nit123 and a default secret key as "secret";

                    Note:  Pass this token with authorization Header as "bearer <token>".

   /api/jsonpatch  ->  it is protected end point , in this end point we convert one json object myobj into another 
                        object by applying json patch that is array of opration stored in patch array.

   /api/thumbnail   ->  it is also protected , used to pass a local image and convert it to 50*50.

   *******************************mocha test********************************************************/

   i set test script as "mocha".so we can run test script as npm test and run the server by typing npm start.

   I used chai and mocha to test the input . if output is statu code 200 means it is correct output.

   Prerequisite-: Use Node.js Version 12 or more because older versions are throwing errror.


   ?????????????????????????????????????????Thanks???????????????????????????????????????????????????????/
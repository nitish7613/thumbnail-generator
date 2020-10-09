let chai= require('chai');
let chaihttp = require('chai-http');
 let index= require('../index');

//Assertion style
chai.should();
chai.use(chaihttp);

describe('Test Api',()=>{
	describe('POST /api/jsonpatch',()=>{
		it("It should apply the json patch on json object and return status code 200",(done)=>{
			chai.request(index)
             .post('/api/jsonpatch')
              .end(err,res)=>{
              	response.should.have.status(200);
              	done();
              }
		})
	}) 

		describe('POST /api/thumbnail',()=>{
		it("It should return status code 200",(done)=>{
			chai.request(index)
             .post('/api/thumbnail')
              .end(err,res)=>{
              	response.should.have.status(200);
              	done();
              }
		})
	})
})
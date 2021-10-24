import request from "supertest";

const baseUrl:string="http://localhost:3001";

describe("User-Query-Api",()=>{

    jest.setTimeout(900000);

    test("POST: Auth=> Correct",async()=>{

       const response=await request(baseUrl)
                                .post("/api/user/query/auth")
                                .send({
                                    Email:"eshaan.naik@gmail.com",
                                    Password:"123"
                                });

        console.log("Auth Token:",response.body.Token);
        expect(response.statusCode).toBe(200);
        expect(response.body.LastName).toContain("Naik");

    });

    test("POST: Auth=> Wrong",async()=>{

        const response=await request(baseUrl)
                                 .post("/api/user/query/auth")
                                 .send({
                                     Email:"eshaan.naik@gmail.com",
                                     Password:"12345"
                                 });
 
         //console.log("Auth Token:",response.body.Token);
         expect(response.statusCode).toBe(200);
         expect(response.body).toMatchObject({
            status: 200,
            message: "UserName or Password does not match"
         });
 
     });

});
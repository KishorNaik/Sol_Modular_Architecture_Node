import request from "supertest";

const baseUrl:string="http://localhost:3001";

describe("User-Command-Api",()=>{

    jest.setTimeout(900000);

    test("POST: Register",async()=>{

       const response=await request(baseUrl)
                                .post("/api/user/command/register")
                                .send({
                                    FirstName:"Eshaan",
                                    LastName:"Naik",
                                    Email:"eshaan.naik@gmail.com",
                                    Password:"123"
                                });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);

    });

    test("POST: Update=> Unauthorized",async()=>{

        const response=await request(baseUrl)
                                 .post("/api/user/command/update")
                                 .send({
                                     UserIdentity:'88aecb7e-74d6-4c16-aa82-84504a2d5cfd',   
                                     FirstName:"Eshaan",
                                     LastName:"Naik",
                                     Email:"eshaan.naik@gmail.com",
                                     Password:"123"
                                 });
 
         expect(response.statusCode).toBe(401);
         expect(response.body).toMatchObject({
             message:"Invalid Token"
         }as Error);
 
     });

    test("POST: Update",async()=>{

        const response=await request(baseUrl)
                                 .post("/api/user/command/update")
                                 .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzUwNDc1MDUsImV4cCI6MTYzNTY1MjMwNX0.GzEFU-FVr2q-4RmOLwtXaI_ABcOtIURMPUkmXM9MF9o")
                                 .send({
                                     UserIdentity:'88aecb7e-74d6-4c16-aa82-84504a2d5cfd',   
                                     FirstName:"Eshaan",
                                     LastName:"Naik",
                                     Email:"eshaan.naik@gmail.com",
                                     Password:"123"
                                 });
 
         expect(response.statusCode).toBe(200);
         expect(response.body).toBe(true);
 
     });

     test("POST: Remove=> Unauthorized",async()=>{

        const response=await request(baseUrl)
                                 .post("/api/user/command/remove")
                                 //.set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzUwNDc1MDUsImV4cCI6MTYzNTY1MjMwNX0.GzEFU-FVr2q-4RmOLwtXaI_ABcOtIURMPUkmXM9MF9o")
                                 .send({
                                     UserIdentity:'88aecb7e-74d6-4c16-aa82-84504a2d5cfd'
                                 });
 
         expect(response.statusCode).toBe(401);
         expect(response.body).toMatchObject({
            message:"Invalid Token"
        }as Error);
 
     });

     test("POST: Remove=> authorized",async()=>{

        const response=await request(baseUrl)
                                 .post("/api/user/command/remove")
                                 .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzUwNDc1MDUsImV4cCI6MTYzNTY1MjMwNX0.GzEFU-FVr2q-4RmOLwtXaI_ABcOtIURMPUkmXM9MF9o")
                                 .send({
                                     UserIdentity:'9ace90db-620f-4017-a740-a64809f30273'
                                 });
 
         expect(response.statusCode).toBe(200);
         expect(response.body).toBe(true);
 
     });

});
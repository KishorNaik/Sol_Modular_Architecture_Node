import request from "supertest";

const baseUrl:string="http://localhost:3001";

describe("Post-Command-Api",()=>{

    jest.setTimeout(900000);

    test("POST: Create",async()=>{

       const response=await request(baseUrl)
                                .post("/api/post/command/create")
                                .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzUwNDc1MDUsImV4cCI6MTYzNTY1MjMwNX0.GzEFU-FVr2q-4RmOLwtXaI_ABcOtIURMPUkmXM9MF9o")
                                .send({
                                    UserIdentity:"9a035002-1026-4390-93dd-fac831e798c6",
                                    Post:"Hello..."
                                });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);

    });

    test("POST: Update",async()=>{

        const response=await request(baseUrl)
                                 .post("/api/post/command/update")
                                 .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzUwNDc1MDUsImV4cCI6MTYzNTY1MjMwNX0.GzEFU-FVr2q-4RmOLwtXaI_ABcOtIURMPUkmXM9MF9o")
                                 .send({
                                     PostIdentity:"0a1955e9-97e9-4f5a-890f-1984566720aa",
                                     UserIdentity:"9a035002-1026-4390-93dd-fac831e798c6",
                                     Post:"Hello World"
                                 });
 
         expect(response.statusCode).toBe(200);
         expect(response.body).toBe(true);
 
     });

     test("POST: Remove",async()=>{

        const response=await request(baseUrl)
                                 .post("/api/post/command/remove")
                                 .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzUwNDc1MDUsImV4cCI6MTYzNTY1MjMwNX0.GzEFU-FVr2q-4RmOLwtXaI_ABcOtIURMPUkmXM9MF9o")
                                 .send({
                                     PostIdentity:"0a1955e9-97e9-4f5a-890f-1984566720aa"
                                 });
 
         expect(response.statusCode).toBe(200);
         expect(response.body).toBe(true);
 
     });
 

});
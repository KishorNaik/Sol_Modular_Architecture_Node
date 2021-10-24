import request from "supertest";

const baseUrl:string="http://localhost:3001";

describe("Post-Command-Api",()=>{

    jest.setTimeout(900000);

    test("POST: Get User Post",async()=>{

       const response=await request(baseUrl)
                                .post("/api/post/query/getuserposts")
                                .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzUwNDc1MDUsImV4cCI6MTYzNTY1MjMwNX0.GzEFU-FVr2q-4RmOLwtXaI_ABcOtIURMPUkmXM9MF9o")
                                .send({
                                    UserIdentity:"9a035002-1026-4390-93dd-fac831e798c6",
                                    PageNumber:1,
                                    RowsOfPageNumber:10
                                });

        expect(response.statusCode).toBe(200);
        console.log("Response:=>",JSON.stringify(response.body));
    });
});
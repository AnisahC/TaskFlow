import { NextRequest, NextResponse } from 'next/server';
import { POST, GET } from '../../app/api/tasks/route'; 

describe('/api/tasks - Task Validation', () => {
    it('should return 201 status for successful task addition', async () => {
        // Mock the necessary NextRequest behavior
        const req = {
            json: jest.fn().mockResolvedValue({
                title: 'testtask', 
                startDate: '2022-12-12', 
                endDate: '2022-12-12', 
                priority: 'High', 
                category: 'Work', 
                description: 'testdescription' 
            }),
        } as unknown as NextRequest;

        // Calling the POST function with the mocked request
        const response = await POST(req);

        // Assertions
        if (response) {
            // Expect status 201 for successful task addition
            expect(response.status).toBe(201);

            // Call response.json() and check its return value directly
            const jsonResponse = await response.json();
            expect(jsonResponse).toEqual({
                message: 'Task added',
            });
        } else {
            console.log('No response returned');
        }
    });

    it('should return 201 for fetching task', async () => {
        // Mock the necessary NextRequest behavior
        const req = {
            nextUrl: {
                searchParams: {
                    entries: jest.fn().mockReturnValue([
                        ['title', 'testtask'],
                        ['category', 'Work']
                    ])
                }
            }
        } as unknown as NextRequest;

        // Calling the GET function with the mocked request
        const response = await GET(req);

        // Assertions
        if (response) {
            // Expect status 200 for successful task fetching
            expect(response.status).toBe(200);

            // Call response.json() and check its return value directly
            const jsonResponse = await response.json();
            expect(jsonResponse).toEqual({
                message: 'Task fetched',
            });
        } else {
            console.log('No response returned');
        }
    });
});
import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../../app/api/tasks/route'; 

describe('POST /api/tasks - Add Task Validation', () => {
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
});
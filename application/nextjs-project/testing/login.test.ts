import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../src/app/api/login/route'; 

describe('/api/login - Login', () => {
    it('should return 401 status for invalid credentials', async () => {
        // Mock the necessary NextRequest behavior
        const req = {
            json: jest.fn().mockResolvedValue({
                email: 'a@gmail.com',
                password: '125',
            }),
        } as unknown as NextRequest;

    // Calling the POST function
    const response = await POST(req);

    // Assertions
    if (response) {
        // Expect status 401 for invalid credentials
        expect(response.status).toBe(401);

        // Call response.json() and check its return value directly
        const jsonResponse = await response.json();
        expect(jsonResponse).toEqual({
            message: 'Invalid credentials',
        });
    } else {
        console.log('No response returned');
    }
    });

    it('should return 400 status for empty fields', async () => {
        // Mock the necessary NextRequest behavior
        const req = {
            json: jest.fn().mockResolvedValue({
                email: 'hh',
                password: '',
            }),
        } as unknown as NextRequest;

    // Calling the POST function
    const response = await POST(req);

    // Assertions
    if (response) {
        // Expect status 401 for invalid credentials
        expect(response.status).toBe(400);

        // Call response.json() and check its return value directly
        const jsonResponse = await response.json();
        expect(jsonResponse).toEqual({
            message: 'Email and password are required',
        });
    } else {
        console.log('No response returned');
    }
    });
});
   
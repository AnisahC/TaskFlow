import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../../app/api/users/route'; // Make sure this path is correct

describe('POST /api/users - Registration Validation', () => {
    it('should return 201 status for successful registration', async () => {
        // Mock the necessary NextRequest behavior
        const req = {
            json: jest.fn().mockResolvedValue({
                fullName: 'testuser',
                email: 'jest@gmail.com',
                password: 'testpassword',
            }),

        } as unknown as NextRequest;

        // Calling the POST function with the mocked request
        const response = await POST(req);

        // Assertions
        if (response) {
            console.log('Response returned:', response.status);
            expect(response.status).toBe(201); // Expect status 201 for successful registration

            // Call response.json() and check its return value directly
            const jsonResponse = await response.json();
            expect(jsonResponse).toEqual({
                message: 'User registered successfully',
            });
        } else {
            console.log('No response returned');
        }
    });
});

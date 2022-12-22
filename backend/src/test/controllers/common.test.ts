import { NextFunction, Request, Response } from "express";
import { errorHandler, ERROR_STATUS } from "../../controllers/common";

jest.mock("express-validator", () => {
  return {
    validationResult: jest.fn((req) => ({
      isEmpty: jest.fn(() => !req.body.errors),
      array: jest.fn(),
    })),
  };
});

let mockRes: Response;
let mockNext: NextFunction;

describe("Common", function () {
  beforeEach(function () {
    mockRes = {
      json: jest.fn(),
      status: jest.fn(() => ({
        json: jest.fn(),
      })),
    } as unknown as Response;
    mockNext = jest.fn();
  });

  afterEach(function () {
    jest.clearAllMocks();
  });

  describe("validator Error Handler", function () {
    it("should succeed", function () {
      const mockReq = { body: { errors: false } } as unknown as Request;
      errorHandler(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });

    it("should have error status if there are validator errors", function () {
      const mockReq = { body: { errors: true } } as unknown as Request;
      errorHandler(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(ERROR_STATUS);
    });
  });
});

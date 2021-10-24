import express from "express";
import { AddCorsMiddleware } from "./Cors/CorsMiddlewareExtension";
import { AddExceptionMiddleware } from "./ExceptionHandling/ExceptionMiddlewareExtension";
import { AddGZipCompressionMiddleware } from "./GzipCompress/GZipCompressionMiddlewareExtension";
import { AddJsonMiddleware } from "./Json/JsonMiddlewaresExtensions";
import { AddLoggerMiddleware } from "./Logger/LoggerMiddlewareExtension";
import { AddSecurityHeadersMiddleware } from "./Security/SecurityMiddlewareExtension";

export interface IMiddlewareCollection{
    AddJsonMiddleware(app:express.Application):void;
    AddLoggerMiddleware(app:express.Application):void;
    AddCorsMiddleware(app:express.Application):void;
    AddGzipCompressionMiddleware(app:express.Application):void;
    AddExceptionMiddleware(app:express.Application):void;
    AddSecurityHeadersMiddleware(app:express.Application):void;
}

export class MiddlewareCollection implements IMiddlewareCollection{

    constructor(){
        console.log("Middleware Collection Init");
    }
    
    public AddJsonMiddleware=AddJsonMiddleware;
    public AddLoggerMiddleware=AddLoggerMiddleware;
    public AddCorsMiddleware=AddCorsMiddleware;
    public AddGzipCompressionMiddleware=AddGZipCompressionMiddleware;
    public AddExceptionMiddleware=AddExceptionMiddleware;
    public AddSecurityHeadersMiddleware=AddSecurityHeadersMiddleware;
}


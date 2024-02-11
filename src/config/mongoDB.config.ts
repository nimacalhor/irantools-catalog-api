import { registerAs } from '@nestjs/config';

export default registerAs("mongoDB", () => ({
    uri: process.env.MONGODB_URI
}))

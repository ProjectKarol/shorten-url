"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.tempConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const convict_1 = __importDefault(require("convict"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const DEFAULT_PORT = 8081;
const DEFAULT_DATABASE_PORT = 5432;
exports.tempConfig = (0, convict_1.default)({
    port: {
        env: 'ENV_NODE_PORT',
        default: DEFAULT_PORT,
    },
    database: {
        host: {
            env: 'DATABASE_HOST',
            default: '',
            format: (0, utils_1.createRequiredStringFormat)('DATABASE_HOST'),
        },
        port: {
            env: 'DATABASE_PORT',
            default: DEFAULT_DATABASE_PORT,
        },
        username: {
            env: 'DATABASE_USERNAME',
            default: '',
            format: (0, utils_1.createRequiredStringFormat)('DATABASE_USERNAME'),
        },
        password: {
            env: 'DATABASE_PASSWORD',
            default: '',
            format: (0, utils_1.createRequiredStringFormat)('DATABASE_PASSWORD'),
        },
        database: {
            env: 'DATABASE_DATABASE',
            default: '',
            format: (0, utils_1.createRequiredStringFormat)('DATABASE_DATABASE'),
        },
        ssl: {
            env: 'DATABASE_SSL',
            default: false,
            format: Boolean,
        }
    },
});
exports.tempConfig.validate({ allowed: 'strict' });
exports.config = exports.tempConfig.getProperties();

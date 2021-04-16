"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonsHandler = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';
var PokemonsHandler = /** @class */ (function () {
    function PokemonsHandler() {
        var _this = this;
        this.getPokemons = function (url) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1.default(url)
                            .then(function (res) { return res.json(); })
                            .catch(function (err) { return console.error(err); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getPokemonUrl = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPokemons(POKEAPI_URL)
                            .then(function (pokes) { return __awaiter(_this, void 0, void 0, function () {
                            var data, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, pokes.results.filter(function (poke) {
                                            return poke.name.includes(name);
                                        })];
                                    case 1:
                                        data = _a.sent();
                                        return [4 /*yield*/, data.map(function (poke) { return poke.url; })];
                                    case 2:
                                        result = _a.sent();
                                        return [2 /*return*/, result];
                                }
                            });
                        }); })
                            .catch(function (err) {
                            return err;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.savePokemon = function (pokemon) {
            _this.pokemons = __spreadArray(__spreadArray([], _this.pokemons), [pokemon]);
        };
        this.reset = function () {
            _this.pokemons = [];
        };
        this.getPokemonData = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            return [2 /*return*/, (this.pokemons = [])];
                        }
                        return [4 /*yield*/, this.getPokemonUrl(name).then(function (pokes) { return __awaiter(_this, void 0, void 0, function () {
                                var _i, pokes_1, poke, pokeData, forms, sprites, name_1, front_default, pokemon;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _i = 0, pokes_1 = pokes;
                                            _a.label = 1;
                                        case 1:
                                            if (!(_i < pokes_1.length)) return [3 /*break*/, 4];
                                            poke = pokes_1[_i];
                                            return [4 /*yield*/, this.getPokemons(poke)];
                                        case 2:
                                            pokeData = _a.sent();
                                            forms = pokeData.forms, sprites = pokeData.sprites;
                                            name_1 = forms[0].name;
                                            front_default = sprites.front_default;
                                            pokemon = {
                                                name: name_1,
                                                front_default: front_default,
                                            };
                                            this.savePokemon(pokemon);
                                            _a.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.pokemons = [];
    }
    return PokemonsHandler;
}());
exports.PokemonsHandler = PokemonsHandler;

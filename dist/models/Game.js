"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = exports.Game = exports.Category = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Discount_1 = require("./Discount");
class Category {
}
exports.Category = Category;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Category, default: [] }),
    __metadata("design:type", Array)
], Category.prototype, "parentCategories", void 0);
class Game {
}
exports.Game = Game;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Game.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: "" }),
    __metadata("design:type", String)
], Game.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Game.prototype, "developer", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: [] }),
    __metadata("design:type", Array)
], Game.prototype, "keywords", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Game.prototype, "categories", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: false,
        default: {
            OS: "",
            Processor: "",
            Memory: "",
            Graphics: "",
            DirectX: "",
            Storage: "",
        },
    }),
    __metadata("design:type", Object)
], Game.prototype, "specs", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "popularity", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "stock", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Game.prototype, "images", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: new Discount_1.Discount() }),
    __metadata("design:type", Discount_1.Discount)
], Game.prototype, "discount", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Game.prototype, "reviews", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: () => new Date().toISOString() }),
    __metadata("design:type", String)
], Game.prototype, "releaseDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: () => new Date() }),
    __metadata("design:type", Date)
], Game.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "sales", void 0);
exports.GameModel = (0, typegoose_1.getModelForClass)(Game);
//# sourceMappingURL=Game.js.map
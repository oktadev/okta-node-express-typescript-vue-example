import { GuitarsRepository } from "./guitars";

// Database Interface Extensions:
interface IExtensions {
	guitars: GuitarsRepository;
}

export {
	IExtensions,
	GuitarsRepository
};

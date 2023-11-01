export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `https://spelly.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};
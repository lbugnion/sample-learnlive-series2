import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // The product is read from the DB using an input binding.
    // The name "inputProduct" is defined in function.json.
    const loadedProduct = context.bindings.inputProduct;

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
            product: loadedProduct
        }
    };
};

export default httpTrigger;
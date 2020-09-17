import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const loadedProducts = context.bindings.inputProducts;
    
    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
            products: loadedProducts
        }
    };

};

export default httpTrigger;
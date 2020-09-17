import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const productId = req.params.productId;
    const productToUpdate = req.body;
        
    // Return a 400 (bad request) if there are issues.
    if (productToUpdate == null || productId == null) {
        context.res = {
            status: 400,
            headers: { "Content-Type": "application/json" },
            body: "Product data must be present in request body and productId in the URL."
        }
        return;
    }

    // Return the product back to the caller and also send to Cosmos DB via the out binding.
    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { product: productToUpdate },
        outputProduct: productToUpdate
    };
};

export default httpTrigger;
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log('HTTP trigger function processed a request.');

    const productToCreate = req.body;
        
    // Return a 400 (bad request) if there are issues.
    if (productToCreate == null || productToCreate["id"] == null) {
        context.res = {
            status: 400,
            headers: { "Content-Type": "application/json" },
            body: "Product data must be present in request body and have the 'id' property set."
        }
        return;
    }

    // Return the product back to the caller and also send to Cosmos DB via the out binding.
    return {
        // "res" is the name of the HTTP binding
        res: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { product: productToCreate }
        },
        // "outputProduct" is the name of the binding we created to return data to Cosmos DB
        outputProduct: productToCreate
    }
};

export default httpTrigger;
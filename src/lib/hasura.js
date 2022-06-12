export async function fetchGraphQLasAdmin(operationsDoc, operationName, variables) {
  try {
    const res = await fetch('https://genba-kanri.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': 'VHVW4tm5JtgKjsdKMXMrVA0COFyEc26wEEMw3EB5NgqEH3HuIZzfRZkkpwJJZV3c',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    });
    const responseObj = res.json();
    return responseObj;
  } catch (error) {
    return { msg: 'fetch Graph QL as Adminでエラーが起きました' };
  }
}

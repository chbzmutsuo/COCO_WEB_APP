import { fetchGraphQLasAdmin } from "../hasura"

export class Member {


	static getMembers = async (body) => {
		return await fetchGraphQLasAdmin(`
		query MyQuery {
			members {
				id
				name
				updated_at
				created_at
			}
		}
			`, "MyQuery")

	}


}

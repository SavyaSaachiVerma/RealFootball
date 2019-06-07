export default class User {
	constructor(props) {
		this.userID = props.userID;
		this.email = props.email;
		this.name = props.name;
		this.picture = props.picture;
		this.teams = props.teams;
		this.players = props.players;
		this.leagues = props.leagues;
	}
}

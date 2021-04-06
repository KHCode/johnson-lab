const Member = class {
	name;
	image;
	title;
	current;
	credentials;
	bio;
	research_topic;
	research_url;
	current_job;
	current_job_url;
	osu_years;

	constructor(name, image, title, current, credentials, bio, research_topic, research_url, current_job, current_job_url, osu_years){
		this.name = name;
		this.image = image;
		this.title = title;
		this.current = current;
		this.credentials = credentials;
		this.bio = bio;
		this.research_topic = research_topic;
		this.research_url = research_url;
		this.current_job = current_job;
		this.current_job_url = current_job_url;
		this.osu_years = osu_years;
	}
}

export default Member;

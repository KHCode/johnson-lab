var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Member = require("./models/member");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	host: '0.0.0.0',
	sendmail: true,
    newline: 'unix',
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function(req, res){
	res.render("landing");
});

var labTitles = ['Principle Investigator', 'Postdoctoral Researchers', 'Graduate Students', 'Undergraduate Students'];
var Member = [
	{name: 'Dr. Colin Johnson',
	image: '/images/Johnson Base Final.jpg',
	title: 'Principle Investigator',
	current: true,
	credentials: 'Ph.D 2005 - University of Illinois, Urbana Champaign; Postdoc 2005-2007 - University of Pennsylvania; Postdoc 2007-2011 - University of Wisconsin, Madison',
	bio: 'Colin is a fan of running, comics, cycling, and beans.'},
	{name: 'Dr. Josephine Bonventre',
	image: '/images/bonventre1.jpg',
	title: 'Postdoctoral Researchers',
	current: true,
	credentials: 'This section is for credentials.',
	bio: 'This section is for a mini-bio.'},
	{name: 'Aayushi Manchanda',
	image: '/images/manchanda.jpg',
	title: 'Graduate Students',
	current: true,
	credentials: 'PhD. Candidate - Molecular & Cellular Biology',
	bio: 'Aayushi enjoys puppies and protein pull downs'},
	{name: 'Shauna Otto',
	image: '/images/otto1.jpg',
	title: 'Graduate Students',
	current: true,
	credentials: 'PhD. Candidate - Biochemistry & Biophysics',
	bio: 'Shauna enjoys crafting, karaoke, and membrane transport.'},
	{name: 'James Miyasaki',
	image: '/images/miyasaki.png',
	title: 'Graduate Students',
	current: true,
	credentials: 'Master\'s Student - Biochemistry & Biophysics',
	bio: 'This section is for a mini-bio.'},
	{name: 'Sabrina (Jou-Ying) Lin',
	image: '',
	title: 'Graduate Students',
	current: true,
	credentials: 'Master\'s Student - Biochemistry & Biophysics',
	bio: 'This section is for a mini-bio.'},
	{name: 'Tanushri Kumar',
	image: '/images/kumar.jpg',
	title: 'Undergraduate Students',
	current: true,
	credentials: 'Senior - Biochemistry & Molecular Biology',
	bio: 'This section is for a mini-bio.'},
	{name: 'Rebecca France',
	image: '/images/france.jpg',
	title: 'Undergraduate Students',
	current: true,
	credentials: 'Junior - Biochemistry & Molecular Biology',
	bio: 'This section is for a mini-bio.'},
	{name: 'Susmitha Matlapudi',
	image: '/images/matlapudi.png',
	title: 'Undergraduate Students',
	current: true,
	credentials: 'Senior - Microbiology',
	bio: 'This section is for a mini-bio.'},
	{name: 'Chapman Kuykendall',
	image: '/images/kuykendall.jpg',
	title: 'Undergraduate Students',
	current: true,
	credentials: 'Junior - Biochemistry & Molecular Biology',
	bio: 'Chapman is a junior BMB major originally from Phoenix, Oregon. He enjoys reading, hiking, cooking, and irritating his cat, Gato.'},
];

var former = ['Postdoctoral Researchers', 'Graduate Students', 'Undergraduate Students'];
var formerMember = [
	{name:'Dr. Nazish Abdullah',
	title: 'Postdoctoral Researchers',
	credentials:'',
	researchTopic: 'Dysferlin Biochemistry',
	researchUrl: '',
	currentJob:'Scientist at Regeneron Pharmaceuticals',
	currentJobUrl:'http://www.regeneron.com',
	osuYears: '2011-2014'},
	{name:'Dr. Naomi Marty-Howard',
	title: 'Postdoctoral Researchers',
	credentials:'',
	researchTopic: 'Ferlin-related membrane trafficking',
	researchUrl: '',
	currentJob:'Regional Finance Officer at Ontario Ministry of Natural Resources & Forestry',
	currentJobUrl:'',
	osuYears: '2011-2012'},
	{name:'Dr. Nicole Hams',
	title: 'Graduate Students',
	credentials:'M.S., PhD. - Biochemistry & Biophysics',
	researchTopic: 'Developing single molecule methods to study conformational dynamics of ferlin proteins',
	researchUrl: '',
	currentJob:'Postdoctoral Researcher in the Bartholomew Lab at OSU',
	currentJobUrl:'https://microbiology.science.oregonstate.edu/content/dr-jerri-bartholomew',
	osuYears: '2013-2018'},
	{name:'Dr. Chelsea Wolk-Weiss (nee Holman)',
	title: 'Graduate Students',
	credentials:'PhD. - Biochemistry & Biophysics',
	researchTopic: 'Initial in vitro and in vivo Characterization of the Membrane Trafficking Protein Fer1L6',
	researchUrl: 'https://search.library.oregonstate.edu/permalink/f/ueodtl/CP71253039520001451',
	currentJob:'UW Biotechnology Project Management Program',
	currentJobUrl:'',
	osuYears: '2011-2017'},
	{name:'Dr. Sara Codding',
	title: 'Graduate Students',
	credentials:'PhD. - Biochemistry & Biophysics',
	researchTopic: 'Functional and Structural Analyses of Three Distinct proteins by Biochemical and Biophysical Techniques',
	researchUrl: 'https://search.library.oregonstate.edu/permalink/f/ueodtl/CP71252910560001451',
	currentJob:'Postdoctoral Researcher in the Trudeau Lab at the University of Maryland School of Medicine',
	currentJobUrl:'https://www.medschool.umaryland.edu/profiles/Trudeau-Matthew/',
	osuYears: '2010-2016'},
	{name:'Dr. Murugesh Padmanarayana',
	title: 'Graduate Students',
	credentials: 'M.S., PhD. - Biochemistry & Biophysics',
	researchTopic: 'Characterizing the Functional Properties of Otoferlin, Essential for Neurotransmission in Inner Hair Cells of the Cochlea',
	researchUrl: 'https://search.library.oregonstate.edu/permalink/f/ueodtl/CP71252901380001451',
	currentJob: 'Postdoctoral Researcher in the Dittman Lab at Weill Cornell Medical School',
	currentJobUrl: 'https://sites.google.com/site/dittmanlabhomepage/people',
	osuYears: '2011-2016'},
	{name:'Dr. Paroma Chatterjee',
	title: 'Graduate Students',
	credentials: 'PhD. - Molecular and Cellular Biology',
	researchTopic: 'Establishing Larval Zebrafish as an In Vivo Model Organism for Characterizing the Roles of Otoferlin, a Sensory Hair Cell Protein Essential for Hearing',
	researchUrl: 'https://ir.library.oregonstate.edu/concern/graduate_thesis_or_dissertations/6395wb890',
	currentJob: 'Postdoctoral Researcher in the Barr-Gillespie Lab at the Vollum Institute-OHSU',
	currentJobUrl: 'https://www.ohsu.edu/barr-gillespie-lab/lab-members',
	osuYears: '2011-2016'},
	{name:'Olivia Ozguc',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: [''],
	researchTopic: '',
	researchUrl: '',
	currentJob: '',
	currentJobUrl: '',
	osuYears: '2017-2018'},
	{name:'Trisha Chau',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: ['Honor\'s College Thesis Student', 'SURE Awardee 2015', 'URISC Awardee 2015'],
	researchTopic: '',
	researchUrl: '',
	currentJob: 'Medical Student - OHSU',
	currentJobUrl: '',
	osuYears: '2015-2019'},
	{name:'Blake Hakkila',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: ['Honor\'s College Thesis Student', 'SURE Awardee 2015'],
	researchTopic: '',
	researchUrl: '',
	currentJob: 'Development Engineer - e-MSion Inc',
	currentJobUrl: '',
	osuYears: '2016-2018'},
	{name:'Scott Hershberger',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: ['CURE Awardee 2015'],
	researchTopic: '',
	researchUrl: '',
	currentJob: '',
	currentJobUrl: '',
	osuYears: '2015-2018'},
	{name:'Natalie Syverud',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: [''],
	researchTopic: '',
	researchUrl: '',
	currentJob: '',
	currentJobUrl: '',
	osuYears: '2016'},
	{name:'Franco Felix',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: [''],
	researchTopic: '',
	researchUrl: '',
	currentJob: '',
	currentJobUrl: '',
	osuYears: '2016'},
	{name:'Dana Palmer',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: [''],
	researchTopic: '',
	researchUrl: '',
	currentJob: '',
	currentJobUrl: '',
	osuYears: '2016'},
	{name:'Trenity Norton',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: [''],
	researchTopic: '',
	researchUrl: '',
	currentJob: '',
	currentJobUrl: '',
	osuYears: '2014-2015'},
	{name:'Jacob Hugel',
	title: 'Undergraduate Students',
	credentials: 'Biochemistry & Biophysics',
	honors: ['Honor\'s College Thesis Student', 'URISC-START Awardee 2011'],
	researchTopic: '',
	researchUrl: '',
	currentJob: 'Medical Student - Geisinger Commonwealth School of Medicine',
	currentJobUrl: '',
	osuYears: '2011-2015'},
];

var papers = [
	{title: "Fer1L6 is essential for the development of vertebrate muscle tissue in zebrafish.",
	image: "/images/papers/MBoC2019.JPG",
	url: "https://www.ncbi.nlm.nih.gov/pubmed/30516436",
	citation: "Mol Biol Cell 2019 Feb 1 ;30(3):293-301.",
	authors: "Bonventre JA, Holman C, Manchanda A, Codding SJ, Chau T, Huegel J, Barton C, Tanguay R, Johnson CP",
	abstract: "The precise spatial and temporal expression of genes is essential for proper organismal development. Despite their importance, however, many developmental genes have yet to be identified. We have determined that Fer1l6, a member of the ferlin family of genes, is a novel factor in zebrafish development. We find that Fer1l6 is expressed broadly in the trunk and head of zebrafish larvae and is more restricted to gills and female gonads in adult zebrafish. Using both genetic mutant and morpholino knockdown models, we found that loss of Fer1l6 led to deformation of striated muscle tissues, delayed development of the heart, and high morbidity. Further, expression of genes associated with muscle cell proliferation and differentiation were affected. Fer1l6 was also detected in the C2C12 cell line, and unlike other ferlin homologues, we found Fer1l6 expression was independent of the myoblast-to-myotube transition. Finally, analysis of cell and recombinant protein-based assays indicate that Fer1l6 colocalizes with syntaxin 4 and vinculin, and that the putative C2 domains interact with lipid membranes. We conclude that Fer1l6 has diverged from other vertebrate ferlins to play an essential role in zebrafish skeletal and cardiac muscle development."},
	{title: "Otoferlin C2F Domain-Induced Changes in Membrane Structure Observed by Sum Frequency Generation.",
	image: "/images/papers/BPJ2019.JPG",
	url: "https://www.ncbi.nlm.nih.gov/pubmed/31587832",
	citation: "Biophys J. 2019 Sep 17. pii: S0006-3495(19)30784-2.",
	authors: "Golbek TW, Padmanarayana M, Roeters SJ, Weidner T, Johnson CP, Baio JE.",
	abstract: "Proteins that contain C2 domains are involved in a variety of biological processes, including encoding of sound, cell signaling, and cell membrane repair. Of particular importance is the interface activity of the C-terminal C2F domain of otoferlin due to the pathological mutations known to significantly disrupt the protein's lipid membrane interface binding activity, resulting in hearing loss. Therefore, there is a critical need to define the geometry and positions of functionally important sites and structures at the otoferlin-lipid membrane interface. Here, we describe the first in situ probe of the protein orientation of otoferlin's C2F domain interacting with a cell membrane surface. To identify this protein's orientation at the lipid interface, we applied sum frequency generation (SFG) vibrational spectroscopy and coupled it with simulated SFG spectra to observe and quantify the otoferlin C2F domain interacting with model lipid membranes. A model cell membrane was built with equal amounts of phosphatidylserine and phosphatidylcholine. SFG measurements of the lipids that make up the model membrane indicate a 62% increase in amplitude from the SFG signal near 2075 cm-1 upon protein interaction, suggesting domain-induced changes in the orientation of the lipids and possible membrane curvature. This increase is related to lipid ordering caused by the docking interaction of the otoferlin C2F domain. SFG spectra taken from the amide-I region contain features near 1630 and 1670 cm-1 related to the C2F domains beta-sandwich secondary structure, thus indicating that the domain binds in a specific orientation. By mapping the simulated SFG spectra to the experimentally collected SFG spectra, we found the C2F domain of otoferlin orients 22° normal to the lipid surface. This information allows us to map what portion of the domain directly interacts with the lipid membrane."},
	{title: "Otoferlin Depletion Results in Abnormal Synaptic Ribbons and Altered Intracellular Calcium Levels in Zebrafish",
	image: "/images/papers/NatComm2019.JPG",
	url: "https://www.ncbi.nlm.nih.gov/pubmed/31582816",
	citation: "Sci Rep. 2019 Oct 3;9(1):14273.",
	authors: "Manchanda A, Chatterjee P, Bonventre JA, Haggard DE, Kindt KS, Tanguay RL, Johnson CP.",
	abstract: "The protein otoferlin plays an essential role at the sensory hair cell synapse. Mutations in otoferlin result in deafness and depending on the species, mild to strong vestibular deficits. While studies in mouse models suggest a role for otoferlin in synaptic vesicle exocytosis and endocytosis, it is unclear whether these functions are conserved across species. To address this question, we characterized the impact of otoferlin depletion in zebrafish larvae and found defects in synaptic vesicle recycling, abnormal synaptic ribbons, and higher resting calcium concentrations in hair cells. We also observed abnormal expression of the calcium binding hair cell genes s100s and parvalbumin, as well as the nogo related proteins rtn4rl2a and rtn4rl2b. Exogenous otoferlin partially restored expression of genes affected by endogenous otoferlin depletion. Our results suggest that in addition to vesicle recycling, depletion of otoferlin disrupts resting calcium levels, alters synaptic ribbon architecture, and perturbs transcription of hair cells specific genes during zebrafish development."},
	{title: "Emerging Functional Differences between the Synaptotagmin and Ferlin Calcium Sensor Families.",
	image: "/images/papers/Biochem2017.JPG",	
	url: "https://www.ncbi.nlm.nih.gov/pubmed/31582816",
	citation: "Biochemistry. 2017 Dec 12;56(49):6413-6417.",
	authors: "Johnson CP.",
	abstract: "The ferlin family proteins have emerged as multi-C2 domain regulators of calcium-triggered membrane fusion and fission events. While initially determined to share many of the features of members of the synaptotagmin family of calcium sensors, ferlins in more recent studies have been found to interact directly with non-neuronal voltage-gated calcium channels and nucleate the assembly of membrane-trafficking protein complexes, functions that distinguish them from the more well studied members of the synaptotagmin family. Here we highlight some of the recent findings that have advanced our understanding of ferlins and their functional differences with the synaptotagmin family."},
	{title: "Otoferlin is a multivalent calcium-sensitive scaffold linking SNAREs and calcium channels.",
	image: "/images/papers/PNAS2017.JPG",
	url: "https://www.ncbi.nlm.nih.gov/pubmed/28696301",
	citation: "Proc Natl Acad Sci U S A. 2017 Jul 25;114(30):8023-8028.",
	authors: "Hams N, Padmanarayana M, Qiu W, Johnson CP.",
	abstract: "Sensory hair cells rely on otoferlin as the calcium sensor for exocytosis and encoding of sound preferentially over the neuronal calcium sensor synaptotagmin. Although it is established that synaptotagmin cannot rescue the otoferlin KO phenotype, the large size and low solubility of otoferlin have prohibited direct biochemical comparisons that could establish functional differences between these two proteins. To address this challenge, we have developed a single-molecule colocalization binding titration assay (smCoBRA) that can quantitatively characterize full-length otoferlin from mammalian cell lysate. Using smCoBRA, we found that, although both otoferlin and synaptotagmin bind membrane fusion SNARE proteins, only otoferlin interacts with the L-type calcium channel Cav1.3, showing a significant difference between the synaptic proteins. Furthermore, otoferlin was found capable of interacting with multiple SNARE and Cav1.3 proteins simultaneously, forming a heterooligomer complex. We also found that a deafness-causing missense mutation in otoferlin attenuates binding between otoferlin and Cav1.3, suggesting that deficiencies in this interaction may form the basis for otoferlin-related hearing loss. Based on our results, we propose a model in which otoferlin acts as a calcium-sensitive scaffolding protein, localizing SNARE proteins proximal to the calcium channel so as to synchronize calcium influx with membrane fusion. Our findings also provide a molecular-level explanation for the observation that synaptotagmin and otoferlin are not functionally redundant. This study also validates a generally applicable methodology for quantitatively characterizing large, multivalent membrane proteins."},
	{title: "Dysferlin Binds SNAREs (Soluble N-Ethylmaleimide-sensitive Factor (NSF) Attachment Protein Receptors) and Stimulates Membrane Fusion in a Calcium-sensitive Manner.",
	image: "/images/papers/JBC2016.JPG",
	url: "https://www.ncbi.nlm.nih.gov/pubmed/27226605",
	citation: "J Biol Chem. 2016 Jul 8;291(28):14575-84.",
	authors: "Codding SJ, Marty N, Abdullah N, Johnson CP.",
	abstract: "Resealing of tears in the sarcolemma of myofibers is a necessary step in the repair of muscle tissue. Recent work suggests a critical role for dysferlin in the membrane repair process and that mutations in dysferlin are responsible for limb girdle muscular dystrophy 2B and Miyoshi myopathy. Beyond membrane repair, dysferlin has been linked to SNARE-mediated exocytotic events including cytokine release and acid sphingomyelinase secretion. However, it is unclear whether dysferlin regulates SNARE-mediated membrane fusion. In this study we demonstrate a direct interaction between dysferlin and the SNARE proteins syntaxin 4 and SNAP-23. In addition, analysis of FRET and in vitro reconstituted lipid mixing assays indicate that dysferlin accelerates syntaxin 4/SNAP-23 heterodimer formation and SNARE-mediated lipid mixing in a calcium-sensitive manner. These results support a function for dysferlin as a calcium-sensing SNARE effector for membrane fusion events."},
	
]

app.get("/people", function(req, res){
	res.render("people", {labTitles: labTitles, former: former, member: Member, formerMember: formerMember, });
});

app.get("/papers", function(req, res){
	res.render("papers", {papers: papers});
});

app.get("/research", function(req, res){
	res.render("research");
});

app.get("/contact", function(req, res){
	res.render("contact");
});

app.post("/contact", function(req, res){
	var name = req.body.name
  	var email = req.body.email
  	var message = req.body.message
  	var content = `name: ${name} \n email: ${email} \n message: ${message} `
	mail = {
		to: 'kristopher.hill@gmail.com',
		subject: 'New Message from Johnson Lab Online',
		body: content
	}
	
	transporter.sendMail(mail, function(err, data){
		if(err){
			console.log(err);
		    console.log(info.envelope);
    		console.log(info.messageId);
		}else{
			console.log("Email sent: " + info.response);
		}
	})
	console.log(req.body);
	res.redirect("/contact");
});

app.listen(3000, function(){
	console.log("Now serving Johnson Lab on the web!");
});
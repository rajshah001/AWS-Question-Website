(function() {
    const all_questions = [{
            question: `A company is storing an access key (access key ID and secret access key) in a text file on a custom AMI. The company uses the access key to access DynamoDB tables from instances created from the AMI. The security team has mandated a more secure solution. Which solution will meet the security team’s mandate?`,
            answers: {
                a: "Put the access key in an S3 bucket, and retrieve the access key on boot from the instance.",
                b: "Pass the access key to the instances through instance user data.",
                c: "Obtain the access key from a key server launched in a private subnet",
                d: "Create an IAM role with permissions to access the table, and launch all instances with the new role"
            },
            correctAnswer: "d"
        },
        {
            question: `A company is developing a highly available web application using stateless web servers. Which services are suitable for storing session state data ?`,
            answers: {
                a: "CloudWatch",
                b: "DynamoDB",
                c: "Elastic Load Balancing",
                d: "Storage Gateway"
            },
            correctAnswer: "b"
        },
        {
            question: `Company salespeople upload their sales figures daily. A Solutions Architect needs a durable storage solution for these documents that also protects against users accidentally deleting important documents. Which action will protect against unintended user actions ?`,
            answers: {
                a: "Store data in an EBS volume and create snapshots once a week",
                b: "Store data in an S3 bucket and enable versioning",
                c: "Store data in two S3 buckets in different AWS regions",
                d: "Store data on EC2 instance storage"
            },
            correctAnswer: "b"
        },
        {
            question: `An application requires a highly available relational database with an initial storage capacity of 8 TB.
The database will grow by 8 GB every day. To support expected traffic, at least eight read replicas will
be required to handle database reads.
Which option will meet these requirements?`,
            answers: {
                a: "DynamoDB",
                b: "Amazon S3 ",
                c: "Amazon Aurora ",
                d: "Amazon Redshift "
            },
            correctAnswer: "c"
        },
        {
            question: `A Solutions Architect is designing a critical business application with a relational database that runs
on an EC2 instance. It requires a single EBS volume that can support up to 16,000 IOPS.
Which Amazon EBS volume type can meet the performance requirements of this application?
`,
            answers: {
                a: "EBS Provisioned IOPS SSD",
                b: "EBS Throughput Optimized HDD",
                c: "EBS General Purpose SSD ",
                d: "EBS Cold HDD"
            },
            correctAnswer: "a"
        },
        {
            question: `A web application allows customers to upload orders to an S3 bucket. The resulting Amazon S3
events trigger a Lambda function that inserts a message to an SQS queue. A single EC2 instance
reads messages from the queue, processes them, and stores them in an DynamoDB table partitioned
by unique order ID. Next month traffic is expected to increase by a factor of 10 and a Solutions
Architect is reviewing the architecture for possible scaling problems.
Which component is MOST likely to need re-architecting to be able to scale to accommodate the new
traffic?`,
            answers: {
                a: "Lambda function ",
                b: "SQS queue ",
                c: "EC2 instance ",
                d: "DynamoDB table"
            },
            correctAnswer: "c"
        },
        {
            question: `An application saves the logs to an S3 bucket. A user wants to keep the logs for one month for troubleshooting purposes, and then purge the logs. What feature will enable this ?`,
            answers: {
                a: "Adding a bucket policy on the S3 bucket.",
                b: "Configuring lifecycle configuration rules on the S3 bucket. ",
                c: "Creating an IAM policy for the S3 bucket.",
                d: "Enabling CORS on the S3 bucket. "
            },
            correctAnswer: "b"
        },
        {
            question: `An application running on EC2 instances processes sensitive information stored on Amazon S3. The
information is accessed over the Internet. The security team is concerned that the Internet
connectivity to Amazon S3 is a security risk.
Which solution will resolve the security concern?`,
            answers: {
                a: "Access the data through an Internet Gateway. ",
                b: "Access the data through a VPN connection. ",
                c: "Access the data through a NAT Gateway. ",
                d: "Access the data through a VPC endpoint for Amazon S3"
            },
            correctAnswer: "d"
        },
        {
            question: `An organization is building an Amazon Redshift cluster in their shared services VPC. The cluster will
host sensitive data.
How can the organization control which networks can access the cluster?`,
            answers: {
                a: "Run the cluster in a different VPC and connect through VPC peering. ",
                b: "Create a database user inside the Amazon Redshift cluster only for users on the network",
                c: "Define a cluster security group for the cluster that allows access from the allowed networks. ",
                d: "Only allow access to networks that connect with the shared services network via VPN."
            },
            correctAnswer: "c"
        },
        {
            question: ` A Solutions Architect is designing an online shopping application running in a VPC on EC2 instances
behind an ELB Application Load Balancer. The instances run in an Auto Scaling group across
multiple Availability Zones. The application tier must read and write data to a customer managed
database cluster. There should be no access to the database from the Internet, but the cluster must
be able to obtain software patches from the Internet.
Which VPC design meets these requirements?`,
            answers: {
                a: "Public subnets for both the application tier and the database cluster",
                b: "Public subnets for the application tier, and private subnets for the database cluster",
                c: "Public subnets for the application tier and NAT Gateway, and private subnets for the database cluster",
                d: "Public subnets for the application tier, and private subnets for the database cluster and NAT Gateway"
            },
            correctAnswer: "c"
        }
    ];

    function create_quiz() {
        const output = [];

        all_questions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            console.log(questionNumber);
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
                );
            }

            output.push(
                `<div class="slide">
			<div class="question_num"> Question ${questionNumber+1} of ${all_questions.length} </div>
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
            );
        });

        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll(".answers");

        let numCorrect = 0;

        all_questions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {

                numCorrect++;

                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                answerContainers[questionNumber].style.color = "red";
            }
        });

        resultsContainer.innerHTML = `Result : ${numCorrect} out of ${all_questions.length} are correct !!!`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // display quiz right away
    create_quiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);

    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref([])

  const getApplications = computed(() => applications.value)

  const getApplicationById = computed(() => (id) =>
    applications.value.find(application => application.id === parseInt(id))
  )

  const getUserApplications = computed(() => (userId) =>
    applications.value.filter(application => application.userId === userId)
  )

  const getApplicationsByStatus = computed(() => (status) =>
    applications.value.filter(application => application.status === status)
  )

  const getApplicationsByType = computed(() => (type) =>
    applications.value.filter(application => application.type === type)
  )

  const initializeApplications = () => {
    const savedApplications = localStorage.getItem('edufund_applications')
    if (savedApplications) {
      applications.value = JSON.parse(savedApplications)
    } else {
      // Initialize with comprehensive mock data
      applications.value = [
        {
          id: 1,
          userId: 1751843455281,
          studentId: 1751843455281,
          type: 'scholarship',
          itemId: 1,
          title: 'Merit-Based Technology Scholarship',
          description: 'Applied for the merit-based scholarship for technology students.',
          amount: 500000,
          organization: 'Tech Foundation Nigeria',
          sponsorName: 'Tech Foundation Nigeria',
          status: 'approved',
          appliedAt: '2024-01-10T08:00:00Z',
          reviewedAt: '2024-01-15T14:30:00Z',
          updatedAt: '2024-01-15T14:30:00Z',
          deadline: '2024-02-01T23:59:59Z',
          referenceId: 'APP-2024-001-TFS',
          studentName: 'John Doe',
          studentEmail: 'john.doe@university.edu',
          requirements: [
            'Academic transcript',
            'Letter of recommendation',
            'Personal statement',
            'Portfolio of projects'
          ],
          submittedDocuments: [
            { id: 1, name: 'Academic_Transcript.pdf', type: 'PDF', size: '2.1MB', uploadedAt: '2024-01-09T10:30:00Z', status: 'approved' },
            { id: 2, name: 'Recommendation_Letter.pdf', type: 'PDF', size: '850KB', uploadedAt: '2024-01-09T11:15:00Z', status: 'approved' },
            { id: 3, name: 'Personal_Statement.pdf', type: 'PDF', size: '1.2MB', uploadedAt: '2024-01-09T14:20:00Z', status: 'approved' },
            { id: 4, name: 'Portfolio.pdf', type: 'PDF', size: '4.5MB', uploadedAt: '2024-01-10T07:45:00Z', status: 'approved' }
          ],
          timeline: [
            { date: '2024-01-10T08:00:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-12T10:00:00Z', event: 'Initial review completed', status: 'completed' },
            { date: '2024-01-15T14:30:00Z', event: 'Final approval', status: 'completed' }
          ],
          reviewerComments: 'Excellent academic performance and impressive project portfolio. Strong candidate for the technology scholarship program.',
          nextSteps: [
            'Complete scholarship acceptance form',
            'Provide bank details for disbursement',
            'Attend scholarship orientation session'
          ]
        },
        {
          id: 2,
          userId: 1751843455281,
          type: 'offer',
          itemId: 2,
          title: 'Software Engineering Internship',
          description: 'Summer internship opportunity at leading tech company.',
          amount: 200000,
          organization: 'TechCorp Solutions',
          status: 'under_review',
          appliedAt: '2024-01-18T13:45:00Z',
          updatedAt: '2024-01-18T13:45:00Z',
          deadline: '2024-02-15T23:59:59Z',
          requirements: [
            'Resume and cover letter',
            'Academic transcript',
            'Coding samples'
          ],
          submittedDocuments: [
            { id: 5, name: 'Resume.pdf', type: 'PDF', size: '1.8MB', uploadedAt: '2024-01-18T14:20:00Z', status: 'pending' },
            { id: 6, name: 'Cover_Letter.pdf', type: 'PDF', size: '650KB', uploadedAt: '2024-01-18T14:25:00Z', status: 'pending' },
            { id: 7, name: 'Transcript.pdf', type: 'PDF', size: '2.3MB', uploadedAt: '2024-01-19T09:10:00Z', status: 'under_review' },
            { id: 8, name: 'Coding_Samples.zip', type: 'ZIP', size: '3.7MB', uploadedAt: '2024-01-19T11:30:00Z', status: 'under_review' }
          ],
          timeline: [
            { date: '2024-01-18T13:45:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-20T09:00:00Z', event: 'Initial screening', status: 'in_progress' },
            { date: '2024-01-25T00:00:00Z', event: 'Technical assessment', status: 'upcoming' },
            { date: '2024-02-01T00:00:00Z', event: 'Final interview', status: 'upcoming' }
          ],
          reviewerComments: 'Strong technical background. Portfolio review in progress.',
          nextSteps: [
            'Waiting for technical review completion',
            'Interview may be scheduled next week'
          ]
        },
        {
          id: 3,
          userId: 1751843455281,
          type: 'scholarship',
          itemId: 3,
          title: 'Women in STEM Scholarship',
          description: 'Applied for scholarship supporting women pursuing STEM education.',
          amount: 300000,
          organization: 'Women Tech Alliance',
          status: 'pending',
          appliedAt: '2024-02-01T12:00:00Z',
          updatedAt: '2024-02-01T12:00:00Z',
          deadline: '2024-03-01T23:59:59Z',
          requirements: [
            'Academic records',
            'Essay on STEM goals',
            'Community involvement proof'
          ],
          submittedDocuments: [
            { id: 9, name: 'Academic_Records.pdf', type: 'PDF', size: '1.5MB', uploadedAt: '2024-01-31T16:30:00Z', status: 'approved' },
            { id: 10, name: 'STEM_Goals_Essay.pdf', type: 'PDF', size: '890KB', uploadedAt: '2024-02-01T11:45:00Z', status: 'pending' }
          ],
          timeline: [
            { date: '2024-02-01T12:00:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-02-05T00:00:00Z', event: 'Initial review', status: 'upcoming' }
          ],
          reviewerComments: null,
          nextSteps: [
            'Submit remaining community involvement documentation',
            'Await initial review feedback'
          ]
        },
        {
          id: 4,
          userId: 1751843455281,
          type: 'offer',
          itemId: 4,
          title: 'Research Assistant Position',
          description: 'Applied for research assistant position in AI and Machine Learning lab.',
          amount: 150000,
          organization: 'University Research Lab',
          status: 'rejected',
          appliedAt: '2024-01-05T09:30:00Z',
          reviewedAt: '2024-01-12T11:15:00Z',
          updatedAt: '2024-01-12T11:15:00Z',
          deadline: '2024-01-20T23:59:59Z',
          requirements: [
            'Research experience',
            'Academic performance',
            'Faculty recommendation'
          ],
          submittedDocuments: [
            { id: 11, name: 'Research_Portfolio.pdf', type: 'PDF', size: '3.2MB', uploadedAt: '2024-01-04T15:20:00Z', status: 'reviewed' },
            { id: 12, name: 'Academic_Performance.pdf', type: 'PDF', size: '1.1MB', uploadedAt: '2024-01-04T16:10:00Z', status: 'reviewed' },
            { id: 13, name: 'Faculty_Recommendation.pdf', type: 'PDF', size: '720KB', uploadedAt: '2024-01-05T08:45:00Z', status: 'reviewed' }
          ],
          timeline: [
            { date: '2024-01-05T09:30:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-08T14:00:00Z', event: 'Document review', status: 'completed' },
            { date: '2024-01-12T11:15:00Z', event: 'Final decision', status: 'completed' }
          ],
          reviewerComments: 'Strong application but position filled by more experienced candidate. Encourage reapplication next semester.',
          nextSteps: [
            'Consider applying for similar positions next semester',
            'Gain more research experience through coursework'
          ],
          rejectionReason: 'Position filled by candidate with more research experience'
        },
        {
          id: 5,
          userId: 1751843455281,
          type: 'scholarship',
          itemId: 5,
          title: 'Excellence in Computer Science Award',
          description: 'Applied for the annual excellence award recognizing outstanding CS students.',
          amount: 750000,
          organization: 'Computer Science Department',
          status: 'withdrawn',
          appliedAt: '2024-01-15T11:45:00Z',
          withdrawnAt: '2024-01-22T14:20:00Z',
          updatedAt: '2024-01-22T14:20:00Z',
          deadline: '2024-02-28T23:59:59Z',
          requirements: [
            'Outstanding GPA (3.8+)',
            'Leadership activities',
            'Technical projects portfolio',
            'Faculty nominations'
          ],
          submittedDocuments: [
            { id: 14, name: 'GPA_Transcript.pdf', type: 'PDF', size: '1.3MB', uploadedAt: '2024-01-14T10:30:00Z', status: 'approved' },
            { id: 15, name: 'Leadership_Portfolio.pdf', type: 'PDF', size: '2.8MB', uploadedAt: '2024-01-15T09:15:00Z', status: 'approved' }
          ],
          timeline: [
            { date: '2024-01-15T11:45:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-18T09:00:00Z', event: 'Initial review', status: 'completed' },
            { date: '2024-01-22T14:20:00Z', event: 'Application withdrawn', status: 'completed' }
          ],
          reviewerComments: null,
          nextSteps: [],
          withdrawalReason: 'Received another scholarship offer with better terms',
          withdrawnBy: 'student'
        },
        {
          id: 6,
          userId: 1751843455281,
          type: 'offer',
          itemId: 6,
          title: 'Startup Accelerator Program',
          description: 'Comprehensive startup accelerator program with mentorship, funding, and networking opportunities.',
          amount: 500000,
          organization: 'Innovation Hub Lagos',
          status: 'pending',
          appliedAt: '2024-02-10T16:00:00Z',
          updatedAt: '2024-02-10T16:00:00Z',
          deadline: '2024-03-01T23:59:59Z',
          requirements: [
            'Business plan',
            'Team information',
            'Market analysis',
            'Financial projections',
            'Pitch deck'
          ],
          submittedDocuments: [
            { id: 16, name: 'Business_Plan_V2.pdf', type: 'PDF', size: '3.8MB', uploadedAt: '2024-02-09T14:30:00Z', status: 'pending' },
            { id: 17, name: 'Team_Profiles.pdf', type: 'PDF', size: '1.9MB', uploadedAt: '2024-02-09T15:45:00Z', status: 'pending' },
            { id: 18, name: 'Market_Analysis.pdf', type: 'PDF', size: '4.2MB', uploadedAt: '2024-02-10T08:20:00Z', status: 'pending' },
            { id: 19, name: 'Financial_Projections.xlsx', type: 'Excel', size: '850KB', uploadedAt: '2024-02-10T12:15:00Z', status: 'pending' }
          ],
          timeline: [
            { date: '2024-02-10T16:00:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-02-15T00:00:00Z', event: 'Initial screening', status: 'upcoming' },
            { date: '2024-02-22T00:00:00Z', event: 'Pitch presentation', status: 'upcoming' },
            { date: '2024-02-28T00:00:00Z', event: 'Final selection', status: 'upcoming' }
          ],
          reviewerComments: null,
          nextSteps: [
            'Complete pitch deck submission',
            'Prepare for initial screening call',
            'Refine business model based on market feedback'
          ]
        },
        {
          id: 7,
          userId: 1751843455281,
          type: 'offer',
          itemId: 7,
          title: 'Mobile App Development Bootcamp',
          description: 'Intensive 12-week mobile development program with industry mentorship and job placement support.',
          amount: 150000,
          organization: 'TechSkills Academy',
          status: 'approved',
          appliedAt: '2024-01-25T08:15:00Z',
          reviewedAt: '2024-02-02T10:30:00Z',
          updatedAt: '2024-02-02T10:30:00Z',
          deadline: '2024-02-10T23:59:59Z',
          requirements: [
            'Programming aptitude test',
            'Motivation letter',
            'Portfolio of projects',
            'Technical interview'
          ],
          submittedDocuments: [
            { id: 20, name: 'Aptitude_Test_Results.pdf', type: 'PDF', size: '650KB', uploadedAt: '2024-01-24T14:20:00Z', status: 'approved' },
            { id: 21, name: 'Motivation_Letter.pdf', type: 'PDF', size: '720KB', uploadedAt: '2024-01-24T16:45:00Z', status: 'approved' },
            { id: 22, name: 'Mobile_Projects_Portfolio.pdf', type: 'PDF', size: '5.2MB', uploadedAt: '2024-01-25T07:30:00Z', status: 'approved' }
          ],
          timeline: [
            { date: '2024-01-25T08:15:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-26T10:00:00Z', event: 'Aptitude test completed', status: 'completed' },
            { date: '2024-01-30T15:00:00Z', event: 'Technical interview', status: 'completed' },
            { date: '2024-02-02T10:30:00Z', event: 'Final approval', status: 'completed' }
          ],
          testResults: [
            {
              name: 'Programming Aptitude Test',
              score: 92,
              maxScore: 100,
              percentile: 95,
              date: '2024-01-26T10:00:00Z',
              status: 'completed'
            }
          ],
          interview: {
            scheduledAt: '2024-01-30T15:00:00Z',
            type: 'Technical Interview',
            duration: 60,
            interviewer: 'Senior Developer Team',
            location: 'TechSkills Academy Campus',
            completed: true,
            result: 'Passed'
          },
          reviewerComments: 'Excellent programming skills and strong motivation. Approved for bootcamp admission.',
          nextSteps: [
            'Complete enrollment forms by Feb 15th',
            'Attend orientation session on Feb 20th',
            'Set up development environment',
            'Begin pre-bootcamp preparation materials'
          ]
        },
        {
          id: 8,
          userId: 1751843455281,
          type: 'scholarship',
          itemId: 8,
          title: 'Sustainable Technology Research Grant',
          description: 'Research grant for developing sustainable technology solutions for environmental challenges.',
          amount: 1500000,
          organization: 'Environmental Tech Institute',
          status: 'rejected',
          appliedAt: '2024-01-12T12:30:00Z',
          reviewedAt: '2024-01-28T14:45:00Z',
          updatedAt: '2024-01-28T14:45:00Z',
          deadline: '2024-01-31T23:59:59Z',
          requirements: [
            'Research proposal',
            'Environmental impact assessment',
            'Technical feasibility study',
            'Budget justification',
            'Supervisor endorsement'
          ],
          submittedDocuments: [
            { id: 23, name: 'Research_Proposal_Solar.pdf', type: 'PDF', size: '2.8MB', uploadedAt: '2024-01-11T16:20:00Z', status: 'reviewed' },
            { id: 24, name: 'Environmental_Impact.pdf', type: 'PDF', size: '1.9MB', uploadedAt: '2024-01-11T18:45:00Z', status: 'reviewed' },
            { id: 25, name: 'Feasibility_Study.pdf', type: 'PDF', size: '3.1MB', uploadedAt: '2024-01-12T09:15:00Z', status: 'reviewed' },
            { id: 26, name: 'Budget_Justification.pdf', type: 'PDF', size: '920KB', uploadedAt: '2024-01-12T11:30:00Z', status: 'reviewed' },
            { id: 27, name: 'Supervisor_Endorsement.pdf', type: 'PDF', size: '580KB', uploadedAt: '2024-01-12T12:00:00Z', status: 'approved' }
          ],
          timeline: [
            { date: '2024-01-12T12:30:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-15T09:00:00Z', event: 'Initial review', status: 'completed' },
            { date: '2024-01-22T14:00:00Z', event: 'Technical evaluation', status: 'completed' },
            { date: '2024-01-28T14:45:00Z', event: 'Final decision', status: 'completed' }
          ],
          reviewerComments: 'While the research topic is relevant, the technical approach lacks innovation and the methodology needs significant improvement. The environmental impact assessment is thorough, but the proposed solution does not demonstrate clear advantages over existing technologies.',
          nextSteps: [
            'Consider reapplying next cycle with improved methodology',
            'Explore collaboration with industry partners',
            'Strengthen technical innovation aspects'
          ],
          rejectionReason: 'Insufficient technical innovation and methodology concerns'
        },
        {
          id: 9,
          userId: 1751843455281,
          type: 'offer',
          itemId: 9,
          title: 'Data Science Internship Program',
          description: 'Comprehensive 6-month data science internship with hands-on projects, mentorship, and certification.',
          amount: 300000,
          organization: 'DataInsights Corp',
          status: 'pending',
          appliedAt: '2024-02-05T09:30:00Z',
          updatedAt: '2024-02-05T09:30:00Z',
          deadline: '2024-02-25T23:59:59Z',
          requirements: [
            'Python programming proficiency',
            'Statistics and mathematics background',
            'Portfolio of data projects',
            'Cover letter explaining interest',
            'Academic transcripts'
          ],
          submittedDocuments: [
            { id: 28, name: 'Python_Portfolio.pdf', type: 'PDF', size: '4.2MB', uploadedAt: '2024-02-04T15:20:00Z', status: 'pending' },
            { id: 29, name: 'Cover_Letter_DataScience.pdf', type: 'PDF', size: '680KB', uploadedAt: '2024-02-04T16:45:00Z', status: 'pending' },
            { id: 30, name: 'Academic_Transcripts.pdf', type: 'PDF', size: '1.1MB', uploadedAt: '2024-02-05T08:30:00Z', status: 'pending' }
          ],
          timeline: [
            { date: '2024-02-05T09:30:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-02-10T00:00:00Z', event: 'Initial review', status: 'upcoming' },
            { date: '2024-02-15T00:00:00Z', event: 'Technical assessment', status: 'upcoming' },
            { date: '2024-02-20T00:00:00Z', event: 'Final interview', status: 'upcoming' }
          ],
          reviewerComments: null,
          nextSteps: [
            'Complete technical assessment when invited',
            'Prepare for data science case study interview',
            'Review machine learning fundamentals'
          ]
        },
        {
          id: 10,
          userId: 1751843455281,
          type: 'scholarship',
          itemId: 10,
          title: 'Women in STEM Leadership Scholarship',
          description: 'Scholarship program supporting women pursuing leadership roles in STEM fields with mentorship and networking opportunities.',
          amount: 750000,
          organization: 'Women in Tech Foundation',
          status: 'under_review',
          appliedAt: '2024-01-28T14:15:00Z',
          updatedAt: '2024-02-03T11:20:00Z',
          deadline: '2024-03-15T23:59:59Z',
          requirements: [
            'Leadership experience essay',
            'STEM academic records',
            'Two professional references',
            'Community service documentation',
            'Future goals statement'
          ],
          submittedDocuments: [
            { id: 31, name: 'Leadership_Essay.pdf', type: 'PDF', size: '850KB', uploadedAt: '2024-01-27T16:20:00Z', status: 'approved' },
            { id: 32, name: 'STEM_Academic_Records.pdf', type: 'PDF', size: '1.4MB', uploadedAt: '2024-01-27T18:45:00Z', status: 'approved' },
            { id: 33, name: 'Reference_Letter_1.pdf', type: 'PDF', size: '620KB', uploadedAt: '2024-01-28T09:15:00Z', status: 'approved' },
            { id: 34, name: 'Reference_Letter_2.pdf', type: 'PDF', size: '580KB', uploadedAt: '2024-01-28T10:30:00Z', status: 'approved' },
            { id: 35, name: 'Community_Service_Portfolio.pdf', type: 'PDF', size: '2.8MB', uploadedAt: '2024-01-28T12:00:00Z', status: 'under_review' },
            { id: 36, name: 'Future_Goals_Statement.pdf', type: 'PDF', size: '720KB', uploadedAt: '2024-01-28T13:45:00Z', status: 'under_review' }
          ],
          timeline: [
            { date: '2024-01-28T14:15:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-02-01T10:00:00Z', event: 'Initial document review', status: 'completed' },
            { date: '2024-02-03T11:20:00Z', event: 'Panel review started', status: 'in_progress' },
            { date: '2024-02-10T00:00:00Z', event: 'Interview round', status: 'upcoming' },
            { date: '2024-02-20T00:00:00Z', event: 'Final decision', status: 'upcoming' }
          ],
          reviewerComments: 'Strong leadership background and excellent academic performance. Community service portfolio demonstrates genuine commitment to STEM outreach.',
          nextSteps: [
            'Prepare for panel interview on Feb 10th',
            'Submit updated community service documentation',
            'Connect with current scholarship recipients for insights'
          ]
        },
        {
          id: 11,
          userId: 1751843455281,
          type: 'offer',
          itemId: 11,
          title: 'Cybersecurity Bootcamp Scholarship',
          description: 'Full scholarship for intensive cybersecurity bootcamp including ethical hacking, penetration testing, and security analysis.',
          amount: 1200000,
          organization: 'CyberSafe Academy',
          status: 'waitlisted',
          appliedAt: '2024-01-20T11:45:00Z',
          reviewedAt: '2024-02-01T16:30:00Z',
          updatedAt: '2024-02-01T16:30:00Z',
          deadline: '2024-02-28T23:59:59Z',
          requirements: [
            'Basic networking knowledge',
            'Programming experience (any language)',
            'Security aptitude test',
            'Background check clearance',
            'Commitment letter'
          ],
          submittedDocuments: [
            { id: 37, name: 'Networking_Certification.pdf', type: 'PDF', size: '920KB', uploadedAt: '2024-01-19T14:20:00Z', status: 'approved' },
            { id: 38, name: 'Programming_Portfolio.pdf', type: 'PDF', size: '3.5MB', uploadedAt: '2024-01-19T16:45:00Z', status: 'approved' },
            { id: 39, name: 'Background_Check_Clearance.pdf', type: 'PDF', size: '450KB', uploadedAt: '2024-01-20T09:30:00Z', status: 'approved' },
            { id: 40, name: 'Commitment_Letter.pdf', type: 'PDF', size: '680KB', uploadedAt: '2024-01-20T11:15:00Z', status: 'approved' }
          ],
          testResults: [
            {
              name: 'Security Aptitude Assessment',
              score: 87,
              maxScore: 100,
              percentile: 78,
              date: '2024-01-22T14:00:00Z',
              status: 'completed'
            }
          ],
          timeline: [
            { date: '2024-01-20T11:45:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-22T14:00:00Z', event: 'Aptitude test completed', status: 'completed' },
            { date: '2024-01-25T10:00:00Z', event: 'Document verification', status: 'completed' },
            { date: '2024-02-01T16:30:00Z', event: 'Initial review completed', status: 'completed' },
            { date: '2024-02-15T00:00:00Z', event: 'Waitlist review', status: 'upcoming' }
          ],
          reviewerComments: 'Good technical foundation and strong motivation. Placed on waitlist due to high competition. Will be considered if spots become available.',
          nextSteps: [
            'Monitor waitlist status updates',
            'Continue developing cybersecurity skills',
            'Consider alternative cybersecurity programs',
            'Stay engaged with CyberSafe Academy community'
          ],
          waitlistPosition: 15,
          waitlistTotal: 45
        },
        {
          id: 12,
          userId: 1751843455281,
          type: 'scholarship',
          itemId: 12,
          title: 'Innovation in Renewable Energy Scholarship',
          description: 'Research scholarship for developing innovative renewable energy solutions with industry partnership opportunities.',
          amount: 2000000,
          organization: 'Green Energy Institute',
          status: 'interview_scheduled',
          appliedAt: '2024-01-15T10:20:00Z',
          reviewedAt: '2024-01-30T13:45:00Z',
          updatedAt: '2024-02-02T09:15:00Z',
          deadline: '2024-03-01T23:59:59Z',
          requirements: [
            'Research proposal on renewable energy',
            'Academic excellence in engineering/science',
            'Industry mentor recommendation',
            'Sustainability project portfolio',
            'Innovation pitch presentation'
          ],
          submittedDocuments: [
            { id: 41, name: 'Renewable_Energy_Research_Proposal.pdf', type: 'PDF', size: '4.8MB', uploadedAt: '2024-01-14T15:20:00Z', status: 'approved' },
            { id: 42, name: 'Academic_Transcripts_Engineering.pdf', type: 'PDF', size: '1.6MB', uploadedAt: '2024-01-14T16:45:00Z', status: 'approved' },
            { id: 43, name: 'Industry_Mentor_Recommendation.pdf', type: 'PDF', size: '780KB', uploadedAt: '2024-01-15T08:30:00Z', status: 'approved' },
            { id: 44, name: 'Sustainability_Portfolio.pdf', type: 'PDF', size: '6.2MB', uploadedAt: '2024-01-15T09:45:00Z', status: 'approved' },
            { id: 45, name: 'Innovation_Pitch_Slides.pdf', type: 'PDF', size: '3.1MB', uploadedAt: '2024-01-15T10:00:00Z', status: 'approved' }
          ],
          timeline: [
            { date: '2024-01-15T10:20:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-18T14:00:00Z', event: 'Document review completed', status: 'completed' },
            { date: '2024-01-25T16:30:00Z', event: 'Technical evaluation', status: 'completed' },
            { date: '2024-01-30T13:45:00Z', event: 'Panel review completed', status: 'completed' },
            { date: '2024-02-08T14:00:00Z', event: 'Final interview scheduled', status: 'upcoming' }
          ],
          interview: {
            scheduledAt: '2024-02-08T14:00:00Z',
            type: 'Research Panel Interview',
            duration: 90,
            interviewer: 'Green Energy Institute Research Board',
            location: 'Virtual Meeting',
            completed: false,
            requirements: [
              'Present 15-minute innovation pitch',
              'Technical Q&A session',
              'Research methodology discussion',
              'Industry partnership proposals'
            ]
          },
          reviewerComments: 'Outstanding research proposal with significant innovation potential. Strong academic background and excellent industry connections. Recommended for final interview round.',
          nextSteps: [
            'Prepare comprehensive pitch presentation',
            'Review technical specifications thoroughly',
            'Practice Q&A on renewable energy trends',
            'Prepare industry partnership strategy'
          ]
        },
        {
          id: 13,
          userId: 1751843455281,
          type: 'offer',
          itemId: 13,
          title: 'AI/ML Engineering Fellowship',
          description: 'Elite fellowship program for AI/ML engineers with research opportunities at top tech companies and startups.',
          amount: 1800000,
          organization: 'AI Research Consortium',
          status: 'approved',
          appliedAt: '2024-01-08T16:30:00Z',
          reviewedAt: '2024-01-22T11:15:00Z',
          updatedAt: '2024-01-22T11:15:00Z',
          deadline: '2024-02-15T23:59:59Z',
          requirements: [
            'Machine learning portfolio',
            'Research publications or papers',
            'Advanced mathematics proficiency',
            'Programming skills assessment',
            'Research proposal presentation'
          ],
          submittedDocuments: [
            { id: 46, name: 'ML_Portfolio_Advanced.pdf', type: 'PDF', size: '8.5MB', uploadedAt: '2024-01-07T14:20:00Z', status: 'approved' },
            { id: 47, name: 'Research_Publications.pdf', type: 'PDF', size: '2.9MB', uploadedAt: '2024-01-07T16:45:00Z', status: 'approved' },
            { id: 48, name: 'Mathematics_Proficiency_Test.pdf', type: 'PDF', size: '1.2MB', uploadedAt: '2024-01-08T09:30:00Z', status: 'approved' },
            { id: 49, name: 'Programming_Assessment_Results.pdf', type: 'PDF', size: '950KB', uploadedAt: '2024-01-08T12:15:00Z', status: 'approved' },
            { id: 50, name: 'Research_Proposal_Presentation.pdf', type: 'PDF', size: '4.1MB', uploadedAt: '2024-01-08T15:45:00Z', status: 'approved' }
          ],
          testResults: [
            {
              name: 'Advanced Programming Assessment',
              score: 96,
              maxScore: 100,
              percentile: 98,
              date: '2024-01-10T10:00:00Z',
              status: 'completed'
            },
            {
              name: 'Machine Learning Theory Exam',
              score: 94,
              maxScore: 100,
              percentile: 95,
              date: '2024-01-12T14:00:00Z',
              status: 'completed'
            }
          ],
          timeline: [
            { date: '2024-01-08T16:30:00Z', event: 'Application submitted', status: 'completed' },
            { date: '2024-01-10T10:00:00Z', event: 'Programming assessment', status: 'completed' },
            { date: '2024-01-12T14:00:00Z', event: 'ML theory exam', status: 'completed' },
            { date: '2024-01-15T16:00:00Z', event: 'Research proposal review', status: 'completed' },
            { date: '2024-01-18T11:30:00Z', event: 'Technical interview', status: 'completed' },
            { date: '2024-01-22T11:15:00Z', event: 'Final approval', status: 'completed' }
          ],
          interview: {
            scheduledAt: '2024-01-18T11:30:00Z',
            type: 'Technical Research Interview',
            duration: 120,
            interviewer: 'AI Research Consortium Senior Fellows',
            location: 'AI Research Center',
            completed: true,
            result: 'Exceptional Performance'
          },
          reviewerComments: 'Exceptional candidate with outstanding technical skills and innovative research approach. Strong publication record and excellent problem-solving abilities. Highly recommended for fellowship.',
          nextSteps: [
            'Complete fellowship onboarding process',
            'Select research mentor and lab assignment',
            'Begin initial research project planning',
            'Attend fellowship orientation program',
            'Submit research timeline and milestones'
          ],
          fellowshipDetails: {
            startDate: '2024-03-01T09:00:00Z',
            duration: '12 months',
            mentor: 'Dr. Sarah Chen - AI Research Director',
            lab: 'Advanced Machine Learning Lab',
            researchFocus: 'Natural Language Processing and Computer Vision'
          }
        }
      ]
      saveApplications()
    }
  }

  const saveApplications = () => {
    localStorage.setItem('edufund_applications', JSON.stringify(applications.value))
  }

  const createApplication = (applicationData) => {
    const newApplication = {
      id: Date.now(),
      ...applicationData,
      status: 'pending',
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedDocuments: [],
      timeline: [
        { date: new Date().toISOString(), event: 'Application submitted', status: 'completed' }
      ],
      reviewerComments: null,
      nextSteps: []
    }
    
    applications.value.push(newApplication)
    saveApplications()
    return newApplication
  }

  const updateApplication = (id, updates) => {
    const index = applications.value.findIndex(application => application.id === id)
    if (index !== -1) {
      applications.value[index] = { ...applications.value[index], ...updates, updatedAt: new Date().toISOString() }
      saveApplications()
      return applications.value[index]
    }
    return null
  }

  const withdrawApplication = (id, reason = 'Withdrawn by student') => {
    const index = applications.value.findIndex(application => application.id === id)
    if (index !== -1) {
      applications.value[index].status = 'withdrawn'
      applications.value[index].withdrawnAt = new Date().toISOString()
      applications.value[index].updatedAt = new Date().toISOString()
      applications.value[index].withdrawalReason = reason
      applications.value[index].withdrawnBy = 'student'
      
      // Add to timeline
      if (!applications.value[index].timeline) {
        applications.value[index].timeline = []
      }
      applications.value[index].timeline.push({
        date: new Date().toISOString(),
        event: 'Application withdrawn',
        status: 'completed'
      })
      
      saveApplications()
      return true
    }
    return false
  }

  const deleteApplication = (id) => {
    const index = applications.value.findIndex(application => application.id === id)
    if (index !== -1) {
      applications.value.splice(index, 1)
      saveApplications()
      return true
    }
    return false
  }

  const uploadDocument = async (applicationId, document) => {
    const application = applications.value.find(app => app.id === applicationId)
    if (application) {
      if (!application.submittedDocuments) {
        application.submittedDocuments = []
      }
      
      const newDocument = {
        id: Date.now(),
        ...document,
        uploadedAt: new Date().toISOString(),
        status: 'pending'
      }
      
      application.submittedDocuments.push(newDocument)
      application.updatedAt = new Date().toISOString()
      saveApplications()
      return newDocument
    }
    return null
  }

  const deleteDocument = async (applicationId, documentId) => {
    const application = applications.value.find(app => app.id === applicationId)
    if (application && application.submittedDocuments) {
      application.submittedDocuments = application.submittedDocuments.filter(doc => doc.id !== documentId)
      application.updatedAt = new Date().toISOString()
      saveApplications()
      return true
    }
    return false
  }

  const updateDocumentStatus = async (applicationId, documentId, status, feedback = null) => {
    const application = applications.value.find(app => app.id === applicationId)
    if (application && application.submittedDocuments) {
      const document = application.submittedDocuments.find(doc => doc.id === documentId)
      if (document) {
        document.status = status
        if (feedback) {
          document.feedback = feedback
        }
        application.updatedAt = new Date().toISOString()
        saveApplications()
        return true
      }
    }
    return false
  }

  const getApplication = (id) => {
    return applications.value.find(app => app.id === parseInt(id))
  }

  return {
    applications,
    getApplications,
    getApplicationById,
    getUserApplications,
    getApplicationsByStatus,
    getApplicationsByType,
    initializeApplications,
    createApplication,
    updateApplication,
    withdrawApplication,
    deleteApplication,
    uploadDocument,
    deleteDocument,
    updateDocumentStatus,
    getApplication
  }
})

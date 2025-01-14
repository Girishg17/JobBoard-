import { Router } from 'express';
import mysql from 'mysql2'; // Correct import

const router = Router();

// Create MySQL connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'job_portal',
});

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job posting
 *     description: Add a new job posting to the database with details such as title, company, location, salary, description, job type, experience, and requirements.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Software Engineer"
 *               company:
 *                 type: string
 *                 example: "Tech Corp"
 *               location:
 *                 type: string
 *                 example: "New York, USA"
 *               salary:
 *                 type: number
 *                 example: 120000
 *               description:
 *                 type: string
 *                 example: "An exciting opportunity to work on cutting-edge technology."
 *               jobType:
 *                 type: string
 *                 example: "Full-Time"
 *               experience:
 *                 type: string
 *                 example: "3-5 years"
 *               requirements:
 *                 type: string
 *                 example: "Bachelor's degree in Computer Science or related field."
 *     responses:
 *       201:
 *         description: Job posting created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Software Engineer"
 *                 company:
 *                   type: string
 *                   example: "Tech Corp"
 *                 location:
 *                   type: string
 *                   example: "New York, USA"
 *                 salary:
 *                   type: number
 *                   example: 120000
 *                 description:
 *                   type: string
 *                   example: "An exciting opportunity to work on cutting-edge technology."
 *                 jobType:
 *                   type: string
 *                   example: "Full-Time"
 *                 experience:
 *                   type: string
 *                   example: "3-5 years"
 *                 requirements:
 *                   type: string
 *                   example: "Bachelor's degree in Computer Science or related field."
 *                 datePosted:
 *                   type: string
 *                   example: "2024-01-01T12:00:00.000Z"
 *       500:
 *         description: Error creating job posting.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating job posting"
 */
router.post('/jobs', (req, res) => {
  const { title, company, location, salary, description, jobType, experience, requirements } = req.body;
  const query = `
    INSERT INTO jobs (title, company, location, salary, description, jobType, experience, requirements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  con.query(query, [title, company, location, salary, description, jobType, experience, requirements], (err, results: mysql.ResultSetHeader) => {
    if (err) {
      console.error('Error inserting job posting:', err);
      return res.status(500).json({ message: 'Error creating job posting' });
    }

    return res.status(201).json({
      id: results.insertId,
      title,
      company,
      location,
      salary,
      description,
      jobType,
      experience,
      requirements,
      datePosted: new Date().toISOString(),
    });
  });
});

/**
 * @swagger
 * /api/getAllJobs:
 *   get:
 *     summary: Retrieve all job postings
 *     description: Fetch all job postings from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved all job postings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Software Engineer"
 *                       company:
 *                         type: string
 *                         example: "Tech Corp"
 *                       location:
 *                         type: string
 *                         example: "New York, USA"
 *                       salary:
 *                         type: number
 *                         example: 120000
 *                       description:
 *                         type: string
 *                         example: "An exciting opportunity to work on cutting-edge technology."
 *                       jobType:
 *                         type: string
 *                         example: "Full-Time"
 *                       experience:
 *                         type: string
 *                         example: "3-5 years"
 *                       requirements:
 *                         type: string
 *                         example: "Bachelor's degree in Computer Science or related field."
 *                       datePosted:
 *                         type: string
 *                         example: "2024-01-01T12:00:00.000Z"
 *       500:
 *         description: Error in fetching jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in fetching jobs"
 */
router.get('/getAllJobs',(req,res) => {
    const query= `SELECT * FROM jobs`
    con.query(query,(err, results: mysql.ResultSetHeader)=>{
        if(err){
            console.log("Error in fetching jobs")
            return res.status(500).json({message: "Error in fetching jobs"})
        }
        return res.status(201).json({message:'Success',data: results});
    })
})

/**
 * @swagger
 * /api/getJobById/{id}:
 *   get:
 *     summary: Get a job posting by ID
 *     description: Retrieve a specific job posting by its ID from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the job posting
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Job posting retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Software Engineer"
 *                 company:
 *                   type: string
 *                   example: "Tech Corp"
 *                 location:
 *                   type: string
 *                   example: "New York, USA"
 *                 salary:
 *                   type: number
 *                   example: 120000
 *                 description:
 *                   type: string
 *                   example: "An exciting opportunity to work on cutting-edge technology."
 *                 jobType:
 *                   type: string
 *                   example: "Full-Time"
 *                 experience:
 *                   type: string
 *                   example: "3-5 years"
 *                 requirements:
 *                   type: string
 *                   example: "Bachelor's degree in Computer Science or related field."
 *       404:
 *         description: Job posting not found
 *       500:
 *         description: Error retrieving job posting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in fetching jobs with id: 1"
 */
router.get('/getJobById/:id',(req,res)=>{
    const {id } =req.params
    const query = `SELECT * FROM jobs where jobs.id = ?`
    con.query(query,[id],(err,results: mysql.ResultSetHeader)=>{
         if(err){
            console.log("Error in fetching jobs with id :", id)
            return res.status(500).json({message: "Error in fetching jobs with id :",id})
         }
         return res.status(201).json({message: 'Success',data: results})

    })
})

/**
 * @swagger
 * /api/updateJobDetailsById/{id}:
 *   put:
 *     summary: Update a job posting by ID
 *     description: Update an existing job posting by its ID with new details.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the job posting
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Software Engineer"
 *               company:
 *                 type: string
 *                 example: "Tech Corp"
 *               location:
 *                 type: string
 *                 example: "New York, USA"
 *               salary:
 *                 type: number
 *                 example: 120000
 *               description:
 *                 type: string
 *                 example: "An exciting opportunity to work on cutting-edge technology."
 *               jobType:
 *                 type: string
 *                 example: "Full-Time"
 *               experience:
 *                 type: string
 *                 example: "3-5 years"
 *               requirements:
 *                 type: string
 *                 example: "Bachelor's degree in Computer Science or related field."
 *     responses:
 *       200:
 *         description: Job posting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job updated successfully"
 *                 updatedJob:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Software Engineer"
 *                     company:
 *                       type: string
 *                       example: "Tech Corp"
 *                     location:
 *                       type: string
 *                       example: "New York, USA"
 *                     salary:
 *                       type: number
 *                       example: 120000
 *                     description:
 *                       type: string
 *                       example: "An exciting opportunity to work on cutting-edge technology."
 *                     jobType:
 *                       type: string
 *                       example: "Full-Time"
 *                     experience:
 *                       type: string
 *                       example: "3-5 years"
 *                     requirements:
 *                       type: string
 *                       example: "Bachelor's degree in Computer Science or related field."
 *                     dateUpdated:
 *                       type: string
 *                       example: "2024-01-01T12:00:00.000Z"
 *       404:
 *         description: Job posting not found
 *       500:
 *         description: Error updating job posting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating job"
 */
router.put('/updateJobDetailsById/:id',(req,res)=>{
    const {id} =req.params
    const { title, company, location, salary, description, jobType, experience, requirements } = req.body;
    const query = `UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ?, jobType = ?, experience = ?, requirements = ? WHERE id = ?`
    con.query(query,[title, company, location, salary, description, jobType, experience, requirements, id],(err, results: mysql.ResultSetHeader) => {
        if (err) {
          console.error(`Error updating job with id: ${id}`);
          return res.status(500).json({ message: "Error updating job" });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: `Job with id: ${id} not found` });
        }
  
        return res.status(200).json({
          message: 'Job updated successfully',
          updatedJob: {
            id,
            title,
            company,
            location,
            salary,
            description,
            jobType,
            experience,
            requirements,
            dateUpdated: new Date().toISOString(),
          },
        });})

})

/**
 * @swagger
 * /api/deleteJobById/{id}:
 *   delete:
 *     summary: Delete a job
 *     description: Deletes a job from the database based on the given ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the job to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted job with id: 1"
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job with id: 1 Not Found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error in deleting job with id: 1"
 */
router.delete('/deleteJobById/:id',(req,res)=>{
    const {id}=req.params
    const query = `DELETE from jobs where id = ?`
    con.query(query,[id],(err, result: mysql.ResultSetHeader)=>{
        if(err){
            console.log("Error in deleting job with id : ",id)
            return res.status(500).json({message: `Error in deleting job with id : ${id}`})
        }
        if(result.affectedRows==0){
            return res.status(404).json({message: ` Job with id : ${id} Not Found`})
        }
        return res.status(201).json({message: `Sucessfully deleted job with id : ${id}`})
    })
})

export default router;

using CrudApp.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data.SqlClient;


namespace CrudApp.Controllers
{
    [ApiController]
   // [Route("api/[controller]")]
    //[EnableCors("AllowOrigin")]
    public class HomeController : Controller
    {
        private readonly AppDbContext _dbContext;

        private static List<TodoItem> todoItems = new List<TodoItem>();

        public HomeController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        /*[HttpGet]
        [Route("/students")]
        public IActionResult GetStudents()
        {
            var students = _dbContext.Students.ToList();
            return View(students);
        }*/
        [HttpGet]
        [Route("/api/students")]
        //[EnableCors("AllowOrigin")] // Enable CORS for this action
        public IActionResult GetStudents()
        {
            var students = _dbContext.Students.ToList();
            return Ok(students); // Return data using Ok() for JSON response
        }

        private bool IsUniqueKeyViolationException(DbUpdateException ex)
        {
            if (ex.InnerException is Microsoft.EntityFrameworkCore.DbUpdateException innerException &&
                innerException.InnerException is System.Data.SqlClient.SqlException sqlException)
            {
                // Check if it's a unique key violation
                return sqlException.Number == 2627 || sqlException.Number == 2601;
            }

            return false;
        }


        [HttpPost]
        [Route("/api/insertStd")]
        public IActionResult InsertStudent([FromBody] Student student)
        {
           
                if (ModelState.IsValid)
                {
                    
                        // Explicitly enable IDENTITY_INSERT
                        _dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Students ON");

                        _dbContext.Students.Add(student);

                       
                        //_dbContext.SaveChanges();
                        Console.WriteLine("After SaveChanges");
                    

                        // Explicitly disable IDENTITY_INSERT
                        _dbContext.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Students OFF");

                        return Ok(student);
                    
                   
                }
                else
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                    Console.WriteLine($"ModelState Errors: {string.Join(", ", errors)}");
                    return BadRequest("Invalid student data");
                }
            
        }

        [HttpGet]
        [Route("/api/addNumbers")]
        public IActionResult AddNumbers()
        {
            return View();
        }


        [HttpGet]
        [Route("/api/message")]
        public IActionResult ReadingShirts(int id)
        {
            var shirtData = new
            {
                Message = $"Calling Message From Backend(ASP.NET): {id}",
                // Other properties you might want to include
            };

            return Json(shirtData);
        }
        
        [HttpGet]
        [Route("/api/todolist")]
        public IActionResult TodoList()
        {
            return View();
        }

        /*public IActionResult AddNumbers([FromBody] NumberRequest request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int num1 = request.Num1;
                    int num2 = request.Num2;

                    int sum = num1 + num2;

                    return Ok(new { Sum = sum });
                }

                return BadRequest("Invalid number data");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return BadRequest("An unexpected error occurred.");
            }
        }*/

    }
}


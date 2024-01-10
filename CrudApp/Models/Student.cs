using System.ComponentModel.DataAnnotations.Schema;

namespace CrudApp.Models
{
    public class Student
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int StudentId { get; set; }
            public string Name { get; set; } = "";
            public int Semester { get; set; }
            public double CGPA { get; set; }
    }
}

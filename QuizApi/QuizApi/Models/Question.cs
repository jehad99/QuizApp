﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApi.Models
{
    public class Question
    {
        [Key] 
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string QnInWords { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string ImgName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Option1 { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Option2 { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Option3 { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Option4 { get; set; }
        public int Answer { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApi.Models;

namespace QuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            var random5Qns = await(_context.Questions
                .Select(x => new
                {
                    id = x.Id,
                    qnInWords= x.QnInWords,
                    imgName = x.ImgName,
                    options = new string[] {x.Option1, x.Option2, x.Option3, x.Option4},
                })
                .OrderBy(y => Guid.NewGuid())
                .Take(5)
                ).ToListAsync();
            return Ok(random5Qns);
        }

        // GET: api/Questions/5
        [HttpPost("GetAnswers")]
        public async Task<ActionResult<Question>> GetAnswers(int[] qnIds)
        {
            var answer = await (_context.Questions
                .Where(a => qnIds.Contains(a.Id))
                .Select(a => new
                {
                    id = a.Id,
                    qnInWords = a.QnInWords,
                    imgName = a.ImgName,
                    options = new string[] { a.Option1, a.Option2, a.Option3, a.Option4 },
                    answer = a.Answer,
                })).ToListAsync();

            if (answer == null)
            {
                return NotFound();
            }

            return Ok(answer);
        }

        // PUT: api/Questions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Questions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}

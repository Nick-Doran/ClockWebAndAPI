using NUnit.Framework;
using Clockwork.API.Controllers;


namespace Tests
{
    [TestFixture]
    public class Tests
    {
        [Test]
        public void TimeQueriesControllerTest()
        {
            //DbContextOptions<ClockworkContext> options;
            //var builder = new DbContextOptionsBuilder<ClockworkContext>();
            //builder.UseInMemoryDatabase();
            //options = builder.Options;
            //DbContextOptionsBuilder<ClockworkContext> optionsBuilder = new DbContextOptionsBuilder<ClockworkContext>();
            // optionsBuilder.UseSqlite(@"Data Source=C:\Users\16149\OneDrive\Documents\AA\clockwork-repo\Clockwork.API\clockwork.db");
            //List <CurrentTimeQuery> timeQueries = new List<CurrentTimeQuery>();
            //  using (var db = new ClockworkContext(optionsBuilder.Options))
            
            TimeQueriesController timeQueriesController = new TimeQueriesController();
            var queriesList = timeQueriesController.GetTimeQueries();
            Assert.AreEqual(typeof(List), queriesList.GetType());
           

        }
    }
}
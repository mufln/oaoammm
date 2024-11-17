namespace hihihiha.Services;

public class InstitutProvider
{
    public static List<Models.Institut> GetAllInstitutions(Context.ApplicationContext context)
    {
        return context.Instituts.ToList();
    }

    public static Models.Institut GetInstitutionById(Context.ApplicationContext context, int id)
    {
        return context.Instituts.Find(id);
    }

    public static void CreateInstitution(Context.ApplicationContext context, Models.Institut institution)
    {
        try
        {
            context.Instituts.Add(institution);
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while creating institution: {e.Message}");
        }
    }

    public static void UpdateInstitution(Context.ApplicationContext context, Models.Institut institution)
    {
        try
        {
            var existingInstitution = context.Instituts.Find(institution.Id);
            if (existingInstitution == null)
            {
                throw new Exception("Institution not found");
            }  
            if (!string.IsNullOrEmpty(institution.Name))
            {
                existingInstitution.Name = institution.Name;
            }
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while updating institution: {e.Message}");
        }
    }

    public static void DeleteInstitution(Context.ApplicationContext context, int id)
    {
        var institution = context.Instituts.Find(id);
        if (institution != null)
        {
            context.Instituts.Remove(institution);
            context.SaveChanges();
        }
    }   
}
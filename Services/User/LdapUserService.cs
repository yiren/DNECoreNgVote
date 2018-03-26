using Novell.Directory.Ldap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngVoteCore.Services.User
{
    public class LdapUserService
    {
        
        
        public bool QueryLdapUser(string user, string searchBaseString, string ADServerAddress, string username, string password)
        {
            string searchBase = searchBaseString;
            int searchScope = LdapConnection.SCOPE_SUB;
            string searchFilter = $"(&(objectclass=user)(cn={user}))";
            using (LdapConnection ldapConn = new LdapConnection())
            {
                ldapConn.Connect(ADServerAddress, 389);
                ldapConn.Bind(username, password);

                LdapSearchResults lsc = ldapConn.Search(searchBase, searchScope, searchFilter, null, false);
                //Console.WriteLine("Count:"+lsc.Count);
                LdapEntry entry = null;
                while (lsc.hasMore())
                {

                    try
                    {
                        entry = lsc.next();
                    }
                    catch (LdapException le)
                    {
                        Console.WriteLine($"error message:{le.LdapErrorMessage}");
                        continue;
                    }
                    //Console.WriteLine(entry.DN);
                    
                    return true;
                   
                }
                return false;
                
            }





        }
    }
}

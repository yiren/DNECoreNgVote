using Novell.Directory.Ldap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngVoteCore.Services.User
{
    public class LdapUserService
    {
        
        
        public bool QueryLdapUser(string user)
        {
            string searchBase = "cn=users,dc=d027,dc=msad,dc=taipower,dc=com,dc=tw";
            int searchScope = LdapConnection.SCOPE_SUB;
            string searchFilter = $"(&(objectclass=user)(cn={user}))";
            using (LdapConnection ldapConn = new LdapConnection())
            {
                ldapConn.Connect("d027.msad.taipower.com.tw", 389);
                ldapConn.Bind("d027admin", "D027cash0506!");

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

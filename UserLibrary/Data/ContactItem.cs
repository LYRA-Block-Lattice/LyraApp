using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.Data
{
    public class ContactItem
    {
        public string name { get; set; }
        public string address { get; set; }

        public override string ToString()
        {
            return name;
        }
    }
}

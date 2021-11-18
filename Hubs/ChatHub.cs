using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Neagu_Denisa_Lab2.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string prenume, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, prenume, message);
        }
    }
}

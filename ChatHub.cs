using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace AngularAspNetCoreSignalR
{
  public class ChatHub : Hub
  {

    public override async Task OnConnectedAsync()
    {
      await Clients.All.InvokeAsync("send", $"{Context.ConnectionId} Joined");
    }

    public override async Task OnDisconnectedAsync(Exception ex)
    {
      await Clients.All.InvokeAsync("sendToAll", $"{Context.ConnectionId} left");
    }

    public Task Send(string message)
    {
      return Clients.All.InvokeAsync("Send", $"{Context.ConnectionId}: {message}");
    }

    public Task SendToGroup(string groupName, string message)
    {
      return Clients.Group(groupName).InvokeAsync("Send", $"{Context.ConnectionId}@{groupName}: {message}");
    }

    public async Task JoinGroup(string groupName)
    {
      await Groups.AddAsync(Context.ConnectionId, groupName);

      await Clients.Group(groupName).InvokeAsync("Send", $"{Context.ConnectionId} joined {groupName}");
    }

    public async Task LeaveGroup(string groupName)
    {
      await Groups.RemoveAsync(Context.ConnectionId, groupName);

      await Clients.Group(groupName).InvokeAsync("Send", $"{Context.ConnectionId} left {groupName}");
    }

    public Task Echo(string message)
    {
      return Clients.Client(Context.ConnectionId).InvokeAsync("Send", $"{Context.ConnectionId}: {message}");
    }

    public void SendToAll(string name, string message)
    {
      Clients.All.InvokeAsync("sendToAll", name, Context.ConnectionId);

      //Clients.Client(Context.ConnectionId).InvokeAsync("sendToAll", $"{Context.ConnectionId} left");
     // Clients.Group(name).InvokeAsync("sendToAll", name, message);
    }
  }

  
}

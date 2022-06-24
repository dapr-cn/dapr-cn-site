+++
title = "Dapr微服务应用开发系列2：Hello World与SDK初接触"
authors = ["zhuyongguang"]
date =  2022-06-17
draft = false

tags = ["Dapr", "微服务",]
summary = "上篇介绍了Dapr的环境配置，这次我们来动手尝试一下Dapr应用的开发"
abstract = "上篇介绍了Dapr的环境配置，这次我们来动手尝试一下Dapr应用的开发"

[header]
image = ""
caption = ""

+++

> 转载自微信公众号文章： [Dapr微服务应用开发系列2：Hello World与SDK初接触](https://mp.weixin.qq.com/s?__biz=MjM5MTc4MDM1MQ==&mid=2651737776&idx=2&sn=e7e3c22ee1c6110fdaa81021cdf388ed&chksm=bd4ab2208a3d3b366b61a3ab293564b0cb2043bc46601227a3a78e954432567d4ef561e58642&mpshare=1&scene=1&srcid=06240CaV4PJTNPgMKeqlCzbu&sharer_sharetime=1656038608004&sharer_shareid=2a8de5b546734f9f71962adcc21ecf16&exportkey=Afz7bRSpPqcfXgwsNaOpyO0%3D&acctmode=0&pass_ticket=lpQlPVrVi6IBcR4Q5mEX4dXJ6hoEgud3PFz9wsajmE4d53A2ziAOtKx7pWf775U1&wx_header=0#rd)

## Hello World

Dapr应用的Hello World其实和其他的Hello World一样简单：

1. 首先用你喜欢的语言和框架创建一个Hello World程序。比如在.NET 5下，就可以简单的这样实现 `dotnet new console -o dapr-hello-world`
2. 只是运行这个Hello World不是直接启动程序，而是通过Dapr来启动：`dapr run --app-id hello-dotnet-dapr -- dotnet run`
3. 上面这个命令，通过传入一个app-id参数来指明这个Dapr应用的名称为“hello-dotnet-dapr”，当然你也可以忽略这个参数，那么Dapr会自动分配一个（如docker运行容器实例那样）
4. 而“--”之后就是应用程序本身的启动命令行

PS：对于dapr run更多的帮助信息，可以通过 `dapr run --help` 来查看

## 服务调用的Hello World

接下来，我们来做一个服务调用的Hello World。我还是基于.NET 5中的ASP.NET Core来作为开发框架：

1. 在命令行中输入如下命令来创建一个ASP.NET Core的Web API项目：`dotnet new webapi -o dapr-service-invocation --no-https --no-openapi`
2. 然后就可以使用Dapr CLI来运行这个服务了：`dapr run --app-id dotnetapp --app-port 5000 --dapr-http-port 13501 -- dotnet run`
3. 其中通过app-port参数指明了这个Web API服务的侦听端口为5000，让Dapr知道如何和你的应用进行配对；使用dapr-http-port参数指明了Dapr边车暴露的http端口为13501，方便外部或者其他Dapr边车知道如何和你的应用边车进行交互。
4. Dapr应用起来之后，就可以使用VS Code的REST Client插件来访问其中的地址了：`GET http://localhost:13501/v1.0/invoke/dotnetapp/method/WeatherForecast`

示例代码可以参见这里：https://github.com/heavenwing/dapr-dotnet-quickstarts/tree/main/ServiceInvocation

## 状态管理的Hello World

状态管理的Hello World稍微复杂一点。你可以把对Dapr状态管理接口的访问代码添加到第一个示例当中（控制台程序）也可以添加到第二个示例当中（Web应用程序）。我们来基于控制台程序访问状态管理接口：

1. 新建或者打开现有的一个dotnet控制台程序，首先创建如下实体类：

  ```c#
  publicclassOrder
  {
      publicint Id { get; set; }

      publicint Amount { get; set; }
  }
  ```

2. 在Program中添加如下常量或静态字段：

  ```c#
  staticstring daprPort = Environment.GetEnvironmentVariable("DAPR_HTTP_PORT") ?? "3500";
  conststring stateStoreName = "statestore";//default state store name
  conststring stateKey = "order-17";
  staticstring stateUrl = $"http://localhost:{daprPort}/v1.0/state/{stateStoreName}";
  ```

  其中第1句，从环境变量中得到Dapr边车暴露的http端口；第2句设置状态存储空间名称，Dapr本地开发环境会提供一个默认的statestore给你；第4句定义了Dapr状态管理的访问地址

3. 为了保存状态值，需要先定义状态内容：

  ```c#
  var state = new List<object>
  {
      new
      {
          key = stateKey,
          value = new Order
          {
              Id = 17,
              Amount = 1
          }
      }
  };
  ```

4. 通过Post方法把序列化后的状态值提交到Dapr的接口上：

  ```c#
  var request = new HttpRequestMessage(HttpMethod.Post, stateUrl);
  request.Content = new StringContent(JsonSerializer.Serialize(state));
  var response = await httpClient.SendAsync(request);
  ```

5. 使用Get方法从Dapr中获取状态值，需要传入你需要获取的状态key：

  ```c#
  request = new HttpRequestMessage(HttpMethod.Get, $"{stateUrl}/{stateKey}");
  response = await httpClient.SendAsync(request);
  Console.WriteLine($"Respone content: {await response.Content?.ReadAsStringAsync()}");
  ```

6. 使用Delete方法从Dapr中输出状态值，需要传入你需要输出的状态key：

  ```c#
  request = new HttpRequestMessage(HttpMethod.Delete, $"{stateUrl}/{stateKey}");
  response = await httpClient.SendAsync(request);
  ```

7. 最后使用如下命令来运行这个Dapr应用：`dapr run --app-id dotnetapp --dapr-http-port 13502 -- dotnet run`

我们可以在控制台中看到状态值被保存、获取和删除的提示信息。

完整的示例代码可以在这里查看：https://github.com/heavenwing/dapr-dotnet-quickstarts/tree/main/StateManagement

## dotnet SDK初接触

上面在应用代码当中直接使用rest api去访问Dapr的状态管理接口，肯定显得稍微复杂。其实我们可以直接通过Dapr提供的dotnet SDK来方便的开发Dapr应用。

dotnet SDK的源代码地址在：https://github.com/dapr/dotnet-sdk

在dotnet SDK中，我最近还合并进去了一个pr，提供如何通过gRPC来包含服务调用接口的示例。大家可以查看这里：https://github.com/dapr/dotnet-sdk/tree/master/samples/AspNetCore/GrpcServiceSample

当然也可以通过Nuget来引用：https://www.nuget.org/packages?q=Tags%3A"Dapr"

通过sdk，我们要访问状态管理就非常简单了，比如如下的示例代码实现一个简单的deposit操作：

```c#
var state = await _daprClient.GetStateEntryAsync<Account>(StoreName, transaction.Id);
state.Value ??= new Account() { Id = transaction.Id, };
state.Value.Balance += transaction.Amount;
await state.SaveAsync();
```
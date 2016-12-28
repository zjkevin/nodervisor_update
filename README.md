# nodervisor_update

基于TAKEALOT的nodervisor项目，在此基础上演进的一个项目，原来的项目作者已经停更两年，站在原来项目的肩膀上继续前进，如果原作者有任何意见可联系本人，分享协作快乐


# 修改以及注意事项

1、express升级到最新版本，新版本的express对中间件做了分离
2、加密库 bcrypt 变更为 bcrypt-nodejs
3、ORM框架: khex升级到最新版本，接口发生变化，做了代码修改
4、ejs前端渲染的语言在继承模板的时候语法做了变更，做了代码修改
5、进入受控服务器的时候，RPC地址请填下http://<服务器IP>:9001/RPC2 不要只写'http://<服务器IP>:9001



nodervisor
==========

A Supervisord manager in node.js. Nodervisor provides a real-time web dashboard for processes running under [supervisord](http://supervisord.org/) across multiple hosts. You can stop and start individual processes, restart all the processes on a host, view logs for a process in real-time, and put a dashboard up for a quick overall summary of your services.

### Requirements

- Node.js
- Supervisord
- NPM

### Installation

  1. Clone the git repository into a folder and run:

        npm install

  2. Update the config.js file with your database connection details.

### How to use it

  Run the app using:

    npm start

  2. After the app has started, navigate to the machine in a browser on port 3000.
  For instance:
    http://localhost:3000

  3. Log in using the default credentials of:
  	<ul>
  		<li>Email: admin@nodervisor</li>
  		<li>Password: admin</li>
	</ul>

  4. Navigate to the users page using the top menu. Change the admin credentials or add a new user and remove them.

  5. Navigate to the hosts page using the top menu. Then add a host running supervisord using the form. Your supervisord config on each host should be set up to allow the xmlrpc interface over a inet port.
  For instance:

      [inet_http_server]
      port = *:9009 ;

  At this point, navigating back to the home page should show you a list of your hosts, and the processes running on them.

### Screenshots

  ![List of hosts with summary](/../screenshots/screenshots/screenshot1.png?raw=true "List of hosts with summary")
  ![Dashboard view with groups](/../screenshots/screenshots/screenshot2.png?raw=true "Dashboard view with groups")
  ![View logs directly](/../screenshots/screenshots/screenshot3.png?raw=true "View logs directly")

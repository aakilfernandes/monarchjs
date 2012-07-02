jQuery.fn.declare = function(property,value){
	//Gives an object a property and returns the object
	this[property]=value;
	return this;
}

jQuery.fn.hasNotDeclared = function(property) {
	//Checks if an object has been given a property
    return this[property] == undefined;
};

jQuery.fn.unique = function(){
	return this[0].unique;
}


Array.prototype.search = function(filters,func){
		var results = [];
		for(var i=0;i<this.length;i++){
			var passes = true;
			if(typeof filters=='object'){
				for(filter in filters){
					if(this[i][filter]!=filters[filter]){
						passes=false;
					}
				}
			}else if (typeof filters=='function'){
				passes = filters(this[i])
			}
			
			if(passes==true){
				if(typeof func == 'function'){
					func(this[i]);
				}
				results.push(this[i]);
			}	
		}
		return results;
	}

var Monarch = {}
Monarch.indicators = ['#','.',','];
Monarch.subjects=[]




jQuery.fn.bestow = function(subject_indicators,iteration_N,func){
	var subjects=[];
	
	if(this.hasNotDeclared('subjects')){
		this.declare('subjects',[])
	}
	
	
	if(iteration_N==null){
		var iteration_N=1;
	}
	
	for(var iteration_n=0; iteration_n<iteration_N; iteration_n++){
		if(typeof subject_indicators == 'string'){
			var subject_strings = subject_indicators.split(',');
			for(i=0;i<subject_strings.length;i++){
				var subject_string = subject_strings[i];
				var subjects_length = Monarch.subjects.length;
				if(subjects_length>0){
					var subject_id=Monarch.subjects[subjects_length-1].id+iteration_n+1
				}else{
					var subject_id=0;
				}
				
				var subject = {
					id:		subject_id,
					lord:	this,
					iteration:{
						n:iteration_n,
						N:iteration_N
						}
					};
			
				var attribute = 'tag';
				for(var j=0;j<subject_string.length;j++){
					var subject_char = subject_string.charAt(j);
					
					if($.inArray(subject_char),Monarch.indicators){
						if(subject.attributes == undefined){
							subject.attributes={};
						}
						
						switch(subject_char){
							case '#':
								attribute = 'id';
								subject.attributes.id=''
								break;
							case '.':
								attribute = 'class';
								if(subject.attributes.classes == undefined){
									subject.attributes.classes=[''];
								}else{
									subject.attributes.classes.push('');
								}
								break;
							case ',':
								subjects.push(subject);
								break;
							default:
								switch(attribute){
									case 'id':
										subject.attributes.id+=subject_char
										break;
									case 'class':
										subject.attributes.classes[subject.attributes.classes.length-1]
											= subject.attributes.classes[subject.attributes.classes.length-1]+subject_char;
										break;
									case 'tag':
										//no attribute given, so its the tag
										if(subject.tag == undefined){
											subject.tag = '';
										}
										subject.tag+=subject_char;
								}
								break;
						}
					}
				}
				subjects.push(subject)
			}
		}else{
			subjects.push(subject_indicator)
		}
	}
	
		
	for(var i=0;i<subjects.length;i++){
		var subject = subjects[i];
		var selector = null;
		
		var attributes_string='';
		
		for (var subject_attribute in subject.attributes){
			switch(subject_attribute){
				case 'classes':
					attributes_string+=' class="';
					for(var j = 0; j<subject.attributes.classes.length; j++){
						attributes_string+=' '+subject.attributes.classes[j];
					}
					attributes_string+='"';
					break;
				case 'id':
					attributes_string+=' id="'+subject.attributes.id+'"';
					break;
			}
		}
		
		switch(subject.tag){
			case 'img':
				this.append('<'+subject.tag+' '+attributes_string+'/>')
				break;
			default:
				this.append('<'+subject.tag+' '+attributes_string+'></'+subject.tag+'>')	
				break;	
		}
		
		this.subjects.push(
			this.children().last().declare('lord',this)
			)
			
		for(key in subject){
			this.subjects[this.subjects.length-1].declare(key,subject[key]);
		}
		
		this.subjects[this.subjects.length-1][0].unique = this.subjects[this.subjects.length-1];
		
		if(typeof func=='function'){
			func(this.subjects[this.subjects.length-1]);	
		}
		
		Monarch.subjects.push(
			this.subjects[this.subjects.length-1]
		)
	}

	return this.subjects[this.subjects.length-1];
}


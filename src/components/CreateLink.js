import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    createLink(description: $description, url: $url) {
      id
      url
      description
    }
  }
`;

const CreateLink = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url
    },
    onCompleted: () => navigate('/')
    
  });



  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({          
                ...formState,         //Solo cambia description
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"  // Mensaje de ayuda en gris, que debes escribir
          />
          <input
            className="mb2"
            value={formState.url}   // Valor = URL
            onChange={(e) =>
              setFormState({
                ...formState,       // Solo cambia el URL 
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div> 
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
